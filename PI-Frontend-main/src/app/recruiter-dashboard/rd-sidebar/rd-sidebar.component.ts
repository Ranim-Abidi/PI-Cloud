import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthSessionService } from '../../services/auth-session.service';

@Component({
    selector: 'app-rd-sidebar',
    standalone: false,
    templateUrl: './rd-sidebar.component.html',
    styleUrls: ['./rd-sidebar.component.scss']
})
export class RdSidebarComponent {
    classApplied = false;

    constructor(
        private router: Router,
        private session: AuthSessionService
    ) { }

    ngOnInit(): void { }

    toggleClass(): void {
        this.classApplied = !this.classApplied;
    }

    logout(): void {
        this.session.clearSession();
        this.classApplied = false;
        this.router.navigate(['/']);
    }
}
