import { FreelanceHomeComponent } from "./freelance-home.component";
import { FreelanceProjectsComponent } from "./freelance-projects.component";
import { FreelanceProjectDetailsComponent } from "./freelance-project-details.component";
import { FreelanceRoutingModule } from "./freelance-routing.module";
import { ClientDashboardComponent } from "./client-dashboard.component";
import { PostMissionComponent } from "./post-mission.component";
import { MesCandidaturesComponent } from "./mes-candidatures.component";
import { FreelanceSchedulerComponent } from "./freelance-scheduler.component";
import { FreelanceWorkspaceComponent } from "./freelance-workspace.component";
import { FreelanceLayoutComponent } from "./layout/freelance-layout.component";
import { FreelanceHeaderComponent } from "./layout/freelance-header.component";
import { FreelanceSidebarComponent } from "./layout/freelance-sidebar.component";
import { FreelanceFooterComponent } from "./layout/freelance-footer.component";
import { FreelanceProfileComponent } from "./freelance-profile.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgApexchartsModule } from "ng-apexcharts";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    FreelanceHomeComponent,
    FreelanceProjectsComponent,
    FreelanceProjectDetailsComponent,
    ClientDashboardComponent,
    PostMissionComponent,
    MesCandidaturesComponent,
    FreelanceSchedulerComponent,
    FreelanceWorkspaceComponent,
    FreelanceLayoutComponent,
    FreelanceHeaderComponent,
    FreelanceSidebarComponent,
    FreelanceFooterComponent,
    FreelanceProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FreelanceRoutingModule,
    NgApexchartsModule,
    SharedModule
  ]
})
export class FreelanceModule {}