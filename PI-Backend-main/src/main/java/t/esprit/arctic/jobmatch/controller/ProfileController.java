package t.esprit.arctic.jobmatch.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import t.esprit.arctic.jobmatch.dto.ProfileCompletenessDto;
import t.esprit.arctic.jobmatch.dto.UpdateProfileRequest;
import t.esprit.arctic.jobmatch.entity.Candidat;
import t.esprit.arctic.jobmatch.entity.OrganisateurEvenement;
import t.esprit.arctic.jobmatch.entity.Recruteur;
import t.esprit.arctic.jobmatch.entity.Utilisateur;
import t.esprit.arctic.jobmatch.freelance.entity.ClientFreelance;
import t.esprit.arctic.jobmatch.service.ProfileCheckService;
import t.esprit.arctic.jobmatch.service.UtilisateurService;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileCheckService profileCheckService;
    private final UtilisateurService utilisateurService;

    @GetMapping("/completeness/{userId}")
    @Transactional
    public ProfileCompletenessDto getProfileCompleteness(@PathVariable Long userId) {
        return profileCheckService.checkProfileCompleteness(userId);
    }

    @GetMapping("/me")
    @Transactional
    public ResponseEntity<?> getMyProfile(Authentication authentication) {
        Utilisateur user = currentUser(authentication);
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Utilisateur non authentifié"));
        }
        return ResponseEntity.ok(toPayload(user));
    }

    @PutMapping("/me")
    @Transactional
    public ResponseEntity<?> updateMyProfile(Authentication authentication, @RequestBody UpdateProfileRequest request) {
        Utilisateur user = currentUser(authentication);
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Utilisateur non authentifié"));
        }
        if (request.nom != null && !request.nom.isBlank() && !request.nom.contains("@")) {
            user.setNom(request.nom.trim());
        }
        if (user instanceof Candidat candidat) {
            if (request.prenom != null) {
                candidat.setPrenom(request.prenom.trim());
            }
            if (request.telephone != null) {
                candidat.setTelephone(request.telephone.trim());
            }
        }
        if (user instanceof Recruteur recruteur) {
            if (request.entreprise != null) {
                recruteur.setEntreprise(request.entreprise);
            }
            if (request.poste != null) {
                recruteur.setPoste(request.poste);
            }
            if (request.secteur != null) {
                recruteur.setSecteur(request.secteur);
            }
        }
        if (user instanceof ClientFreelance client) {
            if (request.entreprise != null) {
                client.setEntreprise(request.entreprise);
            }
            if (request.budget != null) {
                client.setBudget(request.budget);
            }
        }
        if (user instanceof OrganisateurEvenement organisateur) {
            if (request.organisation != null) {
                organisateur.setOrganisation(request.organisation);
            }
            if (request.adresse != null) {
                organisateur.setAdresse(request.adresse);
            }
            if (request.descriptionProjet != null) {
                organisateur.setDescriptionProjet(request.descriptionProjet);
            }
        }
        Utilisateur saved = utilisateurService.save(user);
        return ResponseEntity.ok(toPayload(saved));
    }

    private Utilisateur currentUser(Authentication authentication) {
        if (authentication == null || authentication.getName() == null) {
            return null;
        }
        try {
            return utilisateurService.getByEmail(authentication.getName());
        } catch (Exception ex) {
            return null;
        }
    }

    private Map<String, Object> toPayload(Utilisateur user) {
        Map<String, Object> payload = new LinkedHashMap<>();
        payload.put("id", user.getId());
        payload.put("nom", user.getNom());
        payload.put("email", user.getEmail());
        payload.put("role", user.getRole() != null ? user.getRole().toString() : null);
        payload.put("displayName", buildDisplayName(user));
        if (user instanceof Candidat candidat) {
            payload.put("prenom", candidat.getPrenom());
            payload.put("telephone", candidat.getTelephone());
        }
        if (user instanceof Recruteur recruteur) {
            payload.put("entreprise", recruteur.getEntreprise());
            payload.put("poste", recruteur.getPoste());
            payload.put("secteur", recruteur.getSecteur());
        }
        if (user instanceof ClientFreelance client) {
            payload.put("entreprise", client.getEntreprise());
            payload.put("budget", client.getBudget());
        }
        if (user instanceof OrganisateurEvenement organisateur) {
            payload.put("organisation", organisateur.getOrganisation());
            payload.put("adresse", organisateur.getAdresse());
            payload.put("descriptionProjet", organisateur.getDescriptionProjet());
        }
        return payload;
    }

    private String buildDisplayName(Utilisateur user) {
        if (user == null) {
            return "";
        }
        String nom = user.getNom() != null ? user.getNom().trim() : "";
        if (user instanceof Candidat candidat) {
            String prenom = candidat.getPrenom() != null ? candidat.getPrenom().trim() : "";
            String full = (prenom + " " + nom).trim();
            if (!full.isEmpty() && !full.contains("@")) {
                return full;
            }
        }
        if (!nom.isEmpty() && !nom.contains("@")) {
            return nom;
        }
        return "";
    }
}
