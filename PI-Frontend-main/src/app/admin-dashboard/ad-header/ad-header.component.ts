import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { AuthSessionService } from '../../services/auth-session.service';

@Component({
    selector: 'app-ad-header',
    standalone: false,
    templateUrl: './ad-header.component.html',
    styleUrls: ['./ad-header.component.scss']
})
export class AdHeaderComponent implements OnInit {

    adminName: string = '';

    constructor(
        private router: Router,
        private api: ApiService,
        private session: AuthSessionService
    ) {
        this.adminName = this.session.storedDisplayName('Admin');
    }

    ngOnInit(): void {
        this.api.getMyProfile().subscribe({
            next: (data) => {
                this.adminName = this.session.formatDisplayName(data, this.adminName);
                this.session.persistSession({
                    email: data?.email,
                    role: data?.role,
                    displayName: this.adminName,
                    userId: data?.id
                });
            },
            error: () => undefined
        });
    }

    logout() {
        this.session.clearSession();
        this.router.navigate(['/']);
    }
}
