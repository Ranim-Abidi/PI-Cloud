import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthSessionService {
  formatDisplayName(source: any, fallback = 'Utilisateur'): string {
    if (!source) {
      return fallback;
    }
    if (typeof source === 'string') {
      return this.asDisplayName(source) || fallback;
    }
    const composed = [source.prenom, source.nom].filter(Boolean).join(' ').trim();
    return this.asDisplayName(source.displayName)
      || this.asDisplayName(composed)
      || this.asDisplayName(source.userName)
      || this.asDisplayName(source.fullName)
      || fallback;
  }

  asDisplayName(value: unknown): string {
    const name = String(value || '').trim();
    if (!name || name.includes('@')) {
      return '';
    }
    return name;
  }

  persistSession(params: {
    token?: string;
    email?: string;
    role?: string;
    displayName?: string;
    userId?: number | string | null;
  }): void {
    if (params.token) {
      localStorage.setItem('token', params.token);
    }
    const email = this.asEmail(params.email);
    if (email) {
      localStorage.setItem('userEmail', email);
    }
    if (params.role) {
      localStorage.setItem('userRole', String(params.role).toUpperCase().replace(/^ROLE_/, ''));
    }
    const displayName = this.asDisplayName(params.displayName);
    if (displayName) {
      localStorage.setItem('userName', displayName);
    }
    if (params.userId != null && String(params.userId).trim() !== '' && !Number.isNaN(Number(params.userId))) {
      localStorage.setItem('userId', String(params.userId));
    }
  }

  storedDisplayName(fallback = 'Utilisateur'): string {
    return this.asDisplayName(localStorage.getItem('userName'))
      || this.asDisplayName(localStorage.getItem('userFullName'))
      || this.asDisplayName(localStorage.getItem('userNom'))
      || fallback;
  }

  storedEmail(): string {
    const stored = this.asEmail(localStorage.getItem('userEmail'));
    if (stored) {
      return stored;
    }
    const token = localStorage.getItem('token');
    if (!token) {
      return '';
    }
    try {
      const decoded: any = jwtDecode(token);
      return this.asEmail(decoded?.email) || this.asEmail(decoded?.sub);
    } catch {
      return '';
    }
  }

  storedRole(): string {
    return String(localStorage.getItem('userRole') || '').toUpperCase().replace(/^ROLE_/, '');
  }

  userIdFromToken(): number | null {
    const token = localStorage.getItem('token');
    if (!token || !token.includes('.')) {
      return null;
    }
    try {
      const decoded: any = jwtDecode(token);
      const raw = decoded?.id ?? decoded?.userId;
      const id = Number(raw);
      return Number.isFinite(id) && id > 0 ? id : null;
    } catch {
      return null;
    }
  }

  extractNameFromToken(token: string): string {
    try {
      const decoded: any = jwtDecode(token);
      return this.asDisplayName(decoded?.nom)
        || this.asDisplayName(decoded?.name)
        || this.asDisplayName([decoded?.prenom, decoded?.nom].filter(Boolean).join(' '));
    } catch {
      return '';
    }
  }

  clearSession(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('recruteurId');
    localStorage.removeItem('candidatId');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userFullName');
    localStorage.removeItem('userNom');
  }

  private asEmail(value: unknown): string {
    const email = String(value || '').trim();
    return email.includes('@') ? email : '';
  }
}
