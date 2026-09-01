import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { AuthSessionService } from '../../services/auth-session.service';

@Component({
  selector: 'app-account-profile',
  standalone: false,
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss']
})
export class AccountProfileComponent implements OnInit {
  loading = false;
  saving = false;
  errorMessage = '';
  successMessage = '';
  role = '';
  displayName = '';
  form: any = {
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    entreprise: '',
    poste: '',
    secteur: '',
    budget: null,
    organisation: '',
    adresse: '',
    descriptionProjet: ''
  };

  constructor(
    private api: ApiService,
    private session: AuthSessionService
  ) {}

  ngOnInit(): void {
    this.role = this.session.storedRole();
    this.displayName = this.session.storedDisplayName();
    this.loadProfile();
  }

  get title(): string {
    switch (this.role) {
      case 'RECRUTEUR':
        return 'Profil entreprise';
      case 'CLIENT_FREELANCE':
        return 'Profil client freelance';
      case 'ORGANISATEUR':
        return 'Profil organisateur';
      case 'ADMIN':
        return 'Profil administrateur';
      default:
        return 'Mon profil';
    }
  }

  get isCandidat(): boolean {
    return this.role === 'CANDIDAT';
  }

  get isRecruteur(): boolean {
    return this.role === 'RECRUTEUR';
  }

  get isClientFreelance(): boolean {
    return this.role === 'CLIENT_FREELANCE';
  }

  get isOrganisateur(): boolean {
    return this.role === 'ORGANISATEUR';
  }

  loadProfile(): void {
    this.loading = true;
    this.errorMessage = '';
    this.api.getMyProfile().subscribe({
      next: (data) => {
        this.applyProfile(data);
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger le profil. Reconnectez-vous puis réessayez.';
        this.loading = false;
      }
    });
  }

  save(): void {
    this.saving = true;
    this.errorMessage = '';
    this.successMessage = '';
    if (!this.session.asDisplayName(this.form.nom)) {
      this.errorMessage = 'Le nom est obligatoire et ne doit pas être un email.';
      this.saving = false;
      return;
    }

    this.api.updateMyProfile({
      nom: this.form.nom,
      prenom: this.form.prenom,
      telephone: this.form.telephone,
      entreprise: this.form.entreprise,
      poste: this.form.poste,
      secteur: this.form.secteur,
      budget: this.form.budget,
      organisation: this.form.organisation,
      adresse: this.form.adresse,
      descriptionProjet: this.form.descriptionProjet
    }).subscribe({
      next: (data) => {
        this.applyProfile(data);
        this.successMessage = 'Profil mis à jour.';
        this.saving = false;
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Erreur lors de la sauvegarde du profil.';
        this.saving = false;
      }
    });
  }

  private applyProfile(data: any): void {
    if (!data) {
      return;
    }
    this.role = String(data.role || this.role || '').toUpperCase().replace(/^ROLE_/, '');
    this.form = {
      nom: data.nom || '',
      prenom: data.prenom || '',
      email: data.email || this.session.storedEmail(),
      telephone: data.telephone || '',
      entreprise: data.entreprise || '',
      poste: data.poste || '',
      secteur: data.secteur || '',
      budget: data.budget ?? null,
      organisation: data.organisation || '',
      adresse: data.adresse || '',
      descriptionProjet: data.descriptionProjet || ''
    };
    this.displayName = this.session.formatDisplayName(data, this.session.storedDisplayName());
    this.session.persistSession({
      email: data.email,
      role: this.role,
      displayName: this.displayName,
      userId: data.id
    });
  }
}
