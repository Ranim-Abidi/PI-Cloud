import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { AuthSessionService } from '../../services/auth-session.service';

@Component({
    selector: 'app-evenement-header',
    standalone: false,
    templateUrl: './evenement-header.component.html',
    styleUrls: ['./evenement-header.component.scss']
})
export class EvenementHeaderComponent implements OnInit {

    classApplied = false;
    classApplied2 = false;
    userName = '';

    constructor(
        private router: Router,
        private api: ApiService,
        private session: AuthSessionService
    ) {}

    ngOnInit() {
        this.userName = this.session.storedDisplayName('Organisateur');
        this.api.getMyProfile().subscribe({
            next: (data) => {
                this.userName = this.session.formatDisplayName(data, this.userName);
                this.session.persistSession({
                    email: data?.email,
                    role: data?.role,
                    displayName: this.userName,
                    userId: data?.id
                });
            },
            error: () => undefined
        });
    }

    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    toggleClass2() {
        this.classApplied2 = !this.classApplied2;
    }

    logout() {
        this.session.clearSession();
        this.router.navigate(['/']);
    }
}