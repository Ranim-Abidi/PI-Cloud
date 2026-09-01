import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthSessionService } from '../../services/auth-session.service';

@Component({
    selector: 'app-evenement-sidebar',
    standalone: false,
    templateUrl: './evenement-sidebar.component.html',
    styleUrls: ['./evenement-sidebar.component.scss']
})
export class EvenementSidebarComponent {

    classApplied = false;

    constructor(
        private router: Router,
        private session: AuthSessionService
    ) {}

    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    logout(): void {
        this.session.clearSession();
        this.router.navigate(['/']); // ✅ redirige vers home
    }
}