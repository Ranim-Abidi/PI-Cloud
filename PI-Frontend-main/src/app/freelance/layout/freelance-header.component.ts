import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../api.service';
import { AuthSessionService } from '../../services/auth-session.service';
import { FreelanceViewMode, RoleSwitchService } from '../services/role-switch.service';

@Component({
  selector: 'app-freelance-header',
  standalone: false,
  templateUrl: './freelance-header.component.html',
  styleUrls: ['./freelance-header.component.scss']
})
export class FreelanceHeaderComponent implements OnInit, OnDestroy {
  mode: FreelanceViewMode = 'FREELANCER';
  userName = '';
  canSwitchToClient = false;
  private sub?: Subscription;

  constructor(
    public roleSwitch: RoleSwitchService,
    private api: ApiService,
    private session: AuthSessionService
  ) {}

  ngOnInit(): void {
    this.userName = this.session.storedDisplayName();
    this.loadProfileName();
    const role = this.roleSwitch.getJwtRole();
    this.canSwitchToClient = role === 'CLIENT_FREELANCE' || role === 'CANDIDAT';
    this.sub = this.roleSwitch.mode$.subscribe(m => this.mode = m);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  switchToFreelancer(): void {
    this.roleSwitch.switchMode('FREELANCER');
  }

  switchToClient(): void {
    if (!this.canSwitchToClient) {
      return;
    }
    this.roleSwitch.switchMode('CLIENT_FREELANCE');
  }

  private loadProfileName(): void {
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
}
