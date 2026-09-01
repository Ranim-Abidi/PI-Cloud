import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthSessionService } from '../../services/auth-session.service';
import { FreelanceViewMode, RoleSwitchService } from '../services/role-switch.service';

@Component({
  selector: 'app-freelance-sidebar',
  standalone: false,
  templateUrl: './freelance-sidebar.component.html',
  styleUrls: ['./freelance-sidebar.component.scss']
})
export class FreelanceSidebarComponent implements OnInit, OnDestroy {
  classApplied = false;
  mode: FreelanceViewMode = 'FREELANCER';
  isCandidat = false;
  private sub?: Subscription;

  constructor(
    private router: Router,
    private roleSwitch: RoleSwitchService,
    private session: AuthSessionService
  ) {}

  ngOnInit(): void {
    this.isCandidat = this.roleSwitch.getJwtRole() === 'CANDIDAT';
    this.sub = this.roleSwitch.mode$.subscribe(m => this.mode = m);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  toggleClass(): void {
    this.classApplied = !this.classApplied;
  }

  logout(): void {
    this.session.clearSession();
    this.classApplied = false;
    this.router.navigate(['/']);
  }
}
