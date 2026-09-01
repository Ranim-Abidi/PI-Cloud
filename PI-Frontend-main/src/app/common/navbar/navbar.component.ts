import { NgClass } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';
import { jwtDecode } from 'jwt-decode';
import { AuthSessionService } from '../../services/auth-session.service';

@Component({
    selector: 'app-navbar',
    standalone: false,
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    // User authentication state
    isLoggedIn: boolean = false;
    userName: string = '';
    userRole: string = '';
    userDropdownOpen: boolean = false;

    // Navbar Sticky
    isSticky: boolean = false;
    @HostListener('window:scroll')
    checkScroll() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
        this.isSticky = scrollPosition >= 50;
    }

    // Register data
    roles = [
        { key: 'ROLE_CANDIDAT', label: 'Candidat' },
        { key: 'ROLE_RECRUTEUR', label: 'Recruteur' },
        { key: 'ROLE_ORGANISATEUR', label: 'Organisateur' },
        { key: 'ROLE_CLIENT_FREELANCE', label: 'Client Freelance' },
        { key: 'ROLE_ADMIN', label: 'Admin' }
    ];

    registerRole = 'ROLE_CANDIDAT';

    registerData: any = {
        prenom: '',
        nom: '',
        email: '',
        motDePasse: '',
        cv: '',
        niveauEtude: '',
        experience: null,
        entreprise: '',
        poste: '',
        secteur: '',
        budget: null,
        organisation: '',
        adresse: '',
        descriptionProjet: ''
    };

    loginData = {
        email: '',
        motDePasse: ''
    };

    forgotPasswordData = {
        phone: ''
    };

    private resetAuthForms() {
        this.registerData = {
            prenom: '',
            nom: '',
            email: '',
            motDePasse: '',
            cv: '',
            niveauEtude: '',
            experience: null,
            entreprise: '',
            poste: '',
            secteur: '',
            budget: null,
            organisation: '',
            adresse: '',
            descriptionProjet: ''
        };
        this.loginData = { email: '', motDePasse: '' };
        this.forgotPasswordData = { phone: '' };
        this.registerRole = 'ROLE_CANDIDAT';
        this.currentInnerTab = 'candidat';
        this.currentTab = 'tab1';
    }

    constructor(
        public router: Router,
        private apiService: ApiService,
        private session: AuthSessionService
    ) {}

    ngOnInit(): void {
        this.checkUserLoginStatus();
    }

    // ─── Rôle normalisé ────────────────────────────────────────────────────────
    get normalizedRole(): string {
        return (this.userRole || '').toString().trim().toUpperCase().replace(/^ROLE_/, '');
    }

    get isCandidat(): boolean {
        return this.normalizedRole === 'CANDIDAT';
    }

    get isAdmin(): boolean {
        return this.normalizedRole === 'ADMIN';
    }

    // ─── Auth status ───────────────────────────────────────────────────────────
    private checkUserLoginStatus(): void {
        const token = localStorage.getItem('token');
        const savedUserName = localStorage.getItem('userName');
        const savedUserRole = localStorage.getItem('userRole');
        const hasValidToken = !!token && token !== 'undefined' && token !== 'null';

        if (hasValidToken && !this.isTokenExpired(token!)) {
            const fallbackRole = this.extractRoleFromToken(token!);
            this.isLoggedIn = true;
            this.userName = this.session.asDisplayName(savedUserName) || this.session.extractNameFromToken(token!) || '';
            this.userRole = savedUserRole || fallbackRole || 'CANDIDAT';
            return;
        }

        this.session.clearSession();
        this.isLoggedIn = false;
        this.userName = '';
        this.userRole = '';
    }

    private isTokenExpired(token: string): boolean {
        try {
            const decoded: any = jwtDecode(token);
            const exp = Number(decoded?.exp || 0);
            if (!exp) {
                return false;
            }
            return exp <= Math.floor(Date.now() / 1000);
        } catch {
            return true;
        }
    }

    private extractRoleFromToken(token: string): string {
        try {
            const decoded: any = jwtDecode(token);
            return String(decoded?.role || decoded?.roles || decoded?.authorities || '')
                .toUpperCase()
                .replace(/^ROLE_/, '');
        } catch {
            return '';
        }
    }

    private extractNameFromToken(token: string): string {
        return this.session.extractNameFromToken(token);
    }
    

    // ─── Navbar toggle ─────────────────────────────────────────────────────────
    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    // ─── Tabs ──────────────────────────────────────────────────────────────────
    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }

    currentInnerTab = 'candidat';
    switchInnerTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentInnerTab = tab;
        const roleMapping: any = {
            candidat: 'ROLE_CANDIDAT',
            recruteur: 'ROLE_RECRUTEUR',
            clientFreelance: 'ROLE_CLIENT_FREELANCE',
            organisateur: 'ROLE_ORGANISATEUR',
            admin: 'ROLE_ADMIN'
        };
        this.registerRole = roleMapping[tab] || 'ROLE_CANDIDAT';
    }

    // ─── Modal ─────────────────────────────────────────────────────────────────
    isOpen = false;
    openPopup(): void {
        this.resetAuthForms();
        this.isOpen = true;
    }
    closePopup(): void {
        const activeEl = document.activeElement as HTMLElement | null;
        activeEl?.blur();
        this.isOpen = false;
    }

    get registerRoleLabel() {
        const map: any = {
            ROLE_CANDIDAT: 'Candidat',
            ROLE_RECRUTEUR: 'Recruteur',
            ROLE_CLIENT_FREELANCE: 'Client Freelance',
            ROLE_ORGANISATEUR: 'Organisateur',
            ROLE_ADMIN: 'Admin'
        };
        return map[this.registerRole] || 'Candidat';
    }

    // ─── Register ──────────────────────────────────────────────────────────────
    register() {
        const roleValue = this.registerRole.replace('ROLE_', '');
        const userData = {
            ...this.registerData,
            role: roleValue,
            roleString: this.registerRole
        };

        if (!userData.nom || !userData.email || !userData.motDePasse) {
            alert('Veuillez remplir les champs nom, e-mail et mot de passe.');
            return;
        }
        if (String(userData.nom).includes('@') || String(userData.email).indexOf('@') < 0) {
            alert('Le nom ne doit pas être un email. Utilisez un vrai nom et une adresse email valide.');
            return;
        }
        if (this.registerRole === 'ROLE_CANDIDAT' && !userData.prenom) {
            alert('Veuillez renseigner votre prénom.');
            return;
        }

        userData.role = userData.role?.toString().replace(/^ROLE_/, '');

        this.apiService.register(userData).subscribe(
            () => {
                this.apiService.login({ email: userData.email, motDePasse: userData.motDePasse }).subscribe(
                    response => {
                        this.applyLoginResponse(response, userData.email);
                        alert('Inscription réussie !');
                    },
                    () => {
                        alert('Inscription réussie. Connectez-vous avec votre email et mot de passe.');
                        this.currentTab = 'tab1';
                    }
                );
            },
            error => {
                const serverMessage = error?.error?.message || error?.message || error?.statusText || 'Erreur inconnue';
                alert(`Erreur lors de l'inscription (${error.status || '?'}): ${serverMessage}`);
            }
        );
    }

    // ─── Login ─────────────────────────────────────────────────────────────────
    login() {
        if (!this.loginData.email || !this.loginData.motDePasse) {
            alert('Email et mot de passe sont requis pour la connexion.');
            return;
        }

        this.apiService.login(this.loginData).subscribe(
            response => {
                this.applyLoginResponse(response, this.loginData.email);
            },
            error => {
                const isNetworkOrCors = error?.status === 0;
                let finalMessage = '';

                if (isNetworkOrCors) {
                    finalMessage = 'Impossible de joindre le backend. Vérifiez que Spring Boot tourne sur http://localhost:8080 et que le front est lancé via ng serve (proxy actif).';
                } else if (error?.status === 401 || error?.status === 400) {
                    finalMessage = 'Email ou mot de passe incorrect. Veuillez vérifier vos identifiants.';
                } else if (error?.status === 500) {
                    const errorMessage = error?.error?.message?.toLowerCase() || '';
                    if (errorMessage.includes('unrecognized field') || errorMessage.includes('json parse')) {
                        finalMessage = 'Email ou mot de passe incorrect. Veuillez vérifier vos identifiants.';
                    } else {
                        finalMessage = error?.error?.message || 'Une erreur serveur s\'est produite. Veuillez réessayer.';
                    }
                } else {
                    finalMessage = error?.error?.message || error?.message || error?.statusText || 'Erreur inconnue';
                }
                alert(`Erreur lors de la connexion: ${finalMessage}`);
            }
        );
    }

    private applyLoginResponse(response: any, fallbackEmail: string): void {
        const token = typeof response === 'string' ? response : response?.token;
        if (!token || token === 'undefined' || token === 'null') {
            alert('Erreur de connexion: token invalide renvoye par le backend.');
            return;
        }

        let decoded: any = {};
        try {
            decoded = jwtDecode(token);
        } catch {
            decoded = {};
        }

        const roleFromResponse = typeof response === 'object'
            ? (response.role || response.roles || response.user?.role || response.user?.roles)
            : undefined;
        const roleFinal = this.normalizeRole(this.getRoleFromDecodedToken(decoded, roleFromResponse)) || 'CANDIDAT';
        const userEmail = String(response?.email || response?.user?.email || decoded?.email || (typeof decoded?.sub === 'string' && String(decoded.sub).includes('@') ? decoded.sub : '') || fallbackEmail || '').trim();
        const displayName = this.session.formatDisplayName(response, '')
            || this.session.extractNameFromToken(token)
            || this.session.formatDisplayName({ prenom: this.registerData.prenom, nom: this.registerData.nom }, '');

        this.session.persistSession({
            token,
            email: userEmail,
            role: roleFinal,
            displayName,
            userId: decoded?.id || response?.id
        });

        if (roleFinal === 'RECRUTEUR') {
            const recruteurId = Number(decoded?.id || response?.id || 0);
            if (recruteurId > 0) {
                localStorage.setItem('recruteurId', String(recruteurId));
            }
        } else {
            localStorage.removeItem('recruteurId');
        }

        this.isLoggedIn = true;
        this.userName = this.session.storedDisplayName();
        this.userRole = roleFinal;
        this.closePopup();
        this.resetAuthForms();
        setTimeout(() => { this.redirectAfterLogin(roleFinal); }, 100);
    }

    // ─── Redirection post-login ────────────────────────────────────────────────
    private redirectAfterLogin(role: string) {
        const normalizedRole = this.normalizeRole(role);
        console.log('[AUTH DEBUG] redirectAfterLogin inputRole=', role, 'normalizedRole=', normalizedRole);

        if (normalizedRole === 'ADMIN') {
            console.log('[AUTH DEBUG] redirect -> /admin-dashboard');
            this.router.navigate(['/admin-dashboard']);
            return;
        }

        if (normalizedRole === 'CANDIDAT') {
            console.log('[AUTH DEBUG] redirect -> /candidates-dashboard');
            this.router.navigate(['/candidates-dashboard']);
            return;
        }
      
        if (normalizedRole === 'ORGANISATEUR') {
            console.log('[AUTH DEBUG] redirect -> /evenement-dashboard');
            this.router.navigate(['/evenement-dashboard']);
            return;
        }

        if (normalizedRole === 'RECRUTEUR') {
            console.log('[AUTH DEBUG] redirect -> /recruiter-dashboard');
            this.router.navigate(['/recruiter-dashboard']);
            return;
        }

        if (normalizedRole === 'CLIENT_FREELANCE') {
            console.log('[AUTH DEBUG] redirect -> /freelance/dashboard');
            this.router.navigate(['/freelance/dashboard']);
            return;
        }

        console.log('[AUTH DEBUG] redirect fallback -> /');
        this.router.navigate(['/']);
    }

    // ─── Helpers rôle ──────────────────────────────────────────────────────────
    private getRoleFromDecodedToken(decoded: any, roleFromResponse?: any): string {
        const candidates: string[] = [];

        if (roleFromResponse) {
            candidates.push(...this.extractRoleValues(roleFromResponse));
        }
        if (decoded && typeof decoded === 'object') {
            for (const key in decoded) {
                if (decoded.hasOwnProperty(key)) {
                    const lowerKey = key.toLowerCase();
                    if (lowerKey.includes('role') || lowerKey.includes('authority')) {
                        candidates.push(...this.extractRoleValues(decoded[key]));
                    }
                }
            }
        }

        return this.selectPreferredRole(candidates);
    }

    private inferRoleFromEmail(email?: string): string {
        if (!email) return '';
        const e = email.toLowerCase();
        if (e.includes('organisateur')) return 'ORGANISATEUR';
        if (e.includes('recruteur')) return 'RECRUTEUR';
        if (e.includes('candidat') || e.includes('candidate')) return 'CANDIDAT';
        if (e.includes('freelance')) return 'CLIENT_FREELANCE';
        if (e.includes('admin')) return 'ADMIN';
        return '';
    }

    private extractRoleValue(source: any): string {
        if (!source) return '';
        if (typeof source === 'string' && source.trim().length > 0) return source.trim();
        if (Array.isArray(source)) {
            for (const item of source) {
                const role = this.extractRoleValue(item);
                if (role) return role;
            }
            return '';
        }
        if (typeof source === 'object') {
            for (const field of ['role', 'authority', 'name', 'type', 'value']) {
                if (source[field]) {
                    const role = this.extractRoleValue(source[field]);
                    if (role) return role;
                }
            }
        }
        return '';
    }

    private extractRoleValues(source: any): string[] {
        if (!source) return [];

        if (typeof source === 'string') {
            const value = source.trim();
            return value ? [value] : [];
        }

        if (Array.isArray(source)) {
            return source.flatMap(item => this.extractRoleValues(item));
        }

        if (typeof source === 'object') {
            const values: string[] = [];
            for (const field of ['role', 'roles', 'authority', 'authorities', 'name', 'type', 'value']) {
                if (source[field]) {
                    values.push(...this.extractRoleValues(source[field]));
                }
            }
            return values;
        }

        return [];
    }

    private selectPreferredRole(roles: string[]): string {
        if (!roles || roles.length === 0) return '';

        const normalized = roles
            .map(role => this.normalizeRole(role))
            .filter(role => !!role);

        if (normalized.includes('ORGANISATEUR')) return 'ORGANISATEUR';
        if (normalized.includes('RECRUTEUR')) return 'RECRUTEUR';
        if (normalized.includes('CLIENT_FREELANCE')) return 'CLIENT_FREELANCE';
        if (normalized.includes('CANDIDAT')) return 'CANDIDAT';
        if (normalized.includes('ADMIN')) return 'ADMIN';

        return normalized[0] || '';
    }

    // ─── Reset Password ────────────────────────────────────────────────────────
    resetPassword() {
        if (!this.forgotPasswordData.phone) {
            alert('Veuillez entrer votre numéro de téléphone.');
            return;
        }

        // Call API to send new temporary password to phone
        this.apiService.resetPassword(this.forgotPasswordData.phone).subscribe(
            (response: any) => {
                alert('Nouveau mot de passe temporaire envoyé à votre numéro de téléphone! Vérifiez vos SMS.');
                this.forgotPasswordData = { phone: '' };
                this.currentTab = 'tab1';
            },
            (error: any) => {
                const serverMessage = error?.error?.message || error?.message || error?.statusText || 'Erreur inconnue';
                alert(`Erreur lors de la réinitialisation (${error.status || '?'}): ${serverMessage}`);
            }
        );
    }

    private normalizeRole(role?: string): string {
        const raw = (role || '').toString().trim().toUpperCase().replace(/^ROLE_/, '');
        if (!raw) return '';
        if (raw.includes('ORGANISATEUR')) return 'ORGANISATEUR';
        if (raw.includes('RECRUTEUR')) return 'RECRUTEUR';
        if (raw.includes('CLIENT_FREELANCE') || raw.includes('FREELANCE')) return 'CLIENT_FREELANCE';
        if (raw.includes('CANDIDAT') || raw.includes('CANDIDATE')) return 'CANDIDAT';
        if (raw.includes('ADMIN')) return 'ADMIN';
        return raw;
    }

    // ─── Logout / Delete ───────────────────────────────────────────────────────
    logout(): void {
        this.session.clearSession();
        this.isLoggedIn = false;
        this.userName = '';
        this.userRole = '';
        this.userDropdownOpen = false;
        this.router.navigate(['/']);
    }

    deleteAccount(): void {
        const confirmDelete = confirm('⚠️ Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.');
        if (!confirmDelete) return;

        const userId = this.session.userIdFromToken();
        const email = this.session.storedEmail();
        if (userId) {
            this.apiService.deleteAccount(userId, localStorage.getItem('token') || '').subscribe({
                next: () => {
                    this.logout();
                    alert('Compte supprimé.');
                },
                error: () => this.deleteCandidateFallback(email)
            });
            return;
        }
        this.deleteCandidateFallback(email);
    }

    private deleteCandidateFallback(email: string): void {
        if (!email) {
            alert('Erreur: Impossible de récupérer les informations du compte.');
            return;
        }
        this.apiService.getCandidateByEmail(email).subscribe({
            next: (candidateData: any) => {
                if (!candidateData?.id) { alert('Erreur: Impossible de trouver le compte utilisateur.'); return; }
                const candidateId = candidateData.id;
                const localisationId = candidateData.localisation_id;

                this.apiService.deleteCandidate(candidateId).subscribe({
                    next: () => {
                        if (localisationId) {
                            this.apiService.deleteLocalisation(localisationId).subscribe({
                                next: () => this.deleteUserAndLogout(candidateId),
                                error: () => this.deleteUserAndLogout(candidateId)
                            });
                        } else {
                            this.deleteUserAndLogout(candidateId);
                        }
                    },
                    error: () => alert('Erreur lors de la suppression du compte.')
                });
            },
            error: () => alert('Erreur lors de la suppression du compte.')
        });
    }

    private deleteUserAndLogout(candidateId: number): void {
        this.apiService.deleteUser(candidateId).subscribe({
            next: () => { alert('Votre compte a été supprimé avec succès.'); this.logout(); },
            error: () => { alert('Votre profil a été supprimé. Déconnexion...'); this.logout(); }
        });
    }

    toggleUserDropdown(): void { this.userDropdownOpen = !this.userDropdownOpen; }
    closeUserDropdown(): void { this.userDropdownOpen = false; }
}