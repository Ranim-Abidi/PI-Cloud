import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { GoogleMapsModule } from '@angular/google-maps';
import { AuthInterceptor } from './auth.interceptor';
import { SharedModule } from './shared/shared.module';
import { CdDocumentsComponent } from './candidates-dashboard/cd-documents/cd-documents.component';  
// ADMIN
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdHeaderComponent } from './admin-dashboard/ad-header/ad-header.component';
import { AdSidebarComponent } from './admin-dashboard/ad-sidebar/ad-sidebar.component';
import { AdFooterComponent } from './admin-dashboard/ad-footer/ad-footer.component';
import { AdDashboardComponent } from './admin-dashboard/ad-dashboard/ad-dashboard.component';
import { PartenaireListComponent } from './admin-dashboard/partenaire-list/partenaire-list.component';
import { OffreListComponent } from './admin-dashboard/offre-list/offre-list.component';
import { EntretienListComponent } from './admin-dashboard/entretien-list/entretien-list.component';

import { CandidatureListComponent } from './admin-dashboard/candidature-list/candidature-list.component';
import { EvenementListAdminComponent } from './admin-dashboard/evenement-list-admin/evenement-list-admin.component';
import { routes } from './app.routes';
import { App } from './app';


// Import all components
import { NotFoundComponent } from './common/not-found/not-found.component';
import { JobsGridPageComponent } from './pages/jobs-grid-page/jobs-grid-page.component';
import { JobDetailsPageComponent } from './pages/job-details-page/job-details-page.component';
import { CandidatesPageComponent } from './pages/candidates-page/candidates-page.component';
import { EmployerDetailsPageComponent } from './pages/employer-details-page/employer-details-page.component';
import { PrivacyPolicyPageComponent } from './pages/privacy-policy-page/privacy-policy-page.component';
import { TermsConditionsPageComponent } from './pages/terms-conditions-page/terms-conditions-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { BlogDetailsPageComponent } from './pages/blog-details-page/blog-details-page.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { CandidatesDashboardComponent } from './candidates-dashboard/candidates-dashboard.component';
import { CDashboardComponent } from './candidates-dashboard/c-dashboard/c-dashboard.component';
import { CdProfileComponent } from './candidates-dashboard/cd-profile/cd-profile.component';
import { CdBookmarksComponent } from './candidates-dashboard/cd-bookmarks/cd-bookmarks.component';
import { CdAppliedJobsComponent } from './candidates-dashboard/cd-applied-jobs/cd-applied-jobs.component';
import { CdAlertJobsComponent } from './candidates-dashboard/cd-alert-jobs/cd-alert-jobs.component';
import { CdMessageComponent } from './candidates-dashboard/cd-message/cd-message.component';
import { CdChangePasswordComponent } from './candidates-dashboard/cd-change-password/cd-change-password.component';
import { EvenementCandidatComponent } from './candidates-dashboard/evenement-candidat/evenement-candidat.component';
import { MesParticipationsComponent } from './candidates-dashboard/evenement-candidat/mes-participations/mes-participations.component';
import { MaCalendarComponent } from './candidates-dashboard/evenement-candidat/ma-calendar/ma-calendar.component';

// Shared components are in SharedModule now

// More common
import { BlogSidebarComponent } from './common/blog-sidebar/blog-sidebar.component';
import { JobsSidebarComponent } from './common/jobs-sidebar/jobs-sidebar.component';


// Dashboard components
import { CdSidebarComponent } from './candidates-dashboard/cd-sidebar/cd-sidebar.component';
import { CdHeaderComponent } from './candidates-dashboard/cd-header/cd-header.component';
import { CdFooterComponent } from './candidates-dashboard/cd-footer/cd-footer.component';

// Recruiter Dashboard components are now in SharedModule
import { RdPostJobComponent } from './recruiter-dashboard/rd-post-job/rd-post-job.component';
import { RdManageJobsComponent } from './recruiter-dashboard/rd-manage-jobs/rd-manage-jobs.component';
import { RdApplicantsComponent } from './recruiter-dashboard/rd-applicants/rd-applicants.component';
import { RdMessagesComponent } from './recruiter-dashboard/rd-messages/rd-messages.component';
import { RdProfileComponent } from './recruiter-dashboard/rd-profile/rd-profile.component';
import { RdChangePasswordComponent } from './recruiter-dashboard/rd-change-password/rd-change-password.component';

// evenement components
import { EvenementSidebarComponent } from './evenement-dashboard/evenement-sidebar/evenement-sidebar.component';
import { EvenementDashboardComponent } from './evenement-dashboard/evenement-dashboard.component';
import { EvenementFormComponent } from './evenement-dashboard/evenement-form/evenement-form';
import { EvenementListComponent } from './evenement-dashboard/evenement-list/evenement-list.component';
import { EvenementEditComponent } from './evenement-dashboard/evenement-edit/evenement-edit.component';
import { EvenementDetailComponent } from './evenement-dashboard/evenement-detail/evenement-detail.component';
import { DatePipe, registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);
import { EvenementHeaderComponent } from './evenement-dashboard/evenement-header/evenement-header.component';
import { EvenementTemplateComponent } from './evenement-dashboard/evenement-template/evenement-template.component';
import { EvenementDemandesComponent } from './evenement-dashboard/evenement-demandes/evenement-demandes.component';
import { EvenementCalendrierComponent } from './evenement-dashboard/evenement-calendar/evenement-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EvenementFeedbacksComponent } from './evenement-dashboard/evenement-feedback/evenement-feedbacks.component';
import { ChatEvenementComponent } from './candidates-dashboard/evenement-candidat/evenement-chat/evenement-chat.component';
import { FeedbackAdminComponent } from './admin-dashboard/feedback-admin/feedback-admin.component';
import { FormationsAdminComponent } from './admin-dashboard/formations-admin/formations-admin.component';
import { FormationCreateComponent } from './admin-dashboard/formation-create/formation-create.component';
import { FormationEditComponent } from './admin-dashboard/formation-edit/formation-edit.component';
import { FormationParticipantsComponent } from './admin-dashboard/formation-participants/formation-participants.component';
import { MesFormationsComponent } from './candidates-dashboard/mes-formations/mes-formations.component';
import { EvenementChatComponent } from './evenement-dashboard/evenement-chat/evenement-chat.component';
import { ParcoursCreateComponent } from './admin-dashboard/parcours-create/parcours-create.component';
import { ParcoursFeedbackAdminComponent } from './admin-dashboard/parcours-feedback-admin/parcours-feedback-admin.component';
// Banner components are now in SharedModule
// participations

registerLocaleData(localeFr);



@NgModule({
    declarations: [
        App,
        NotFoundComponent,
        JobsGridPageComponent,
        JobDetailsPageComponent,
        CandidatesPageComponent,
        EmployerDetailsPageComponent,
        PrivacyPolicyPageComponent,
        TermsConditionsPageComponent,
        ContactPageComponent,
        BlogPageComponent,
        BlogDetailsPageComponent,
        CategoriesPageComponent,
        CandidatesDashboardComponent,
        CDashboardComponent,
        CdProfileComponent,
        CdBookmarksComponent,
        CdAppliedJobsComponent,
        CdAlertJobsComponent,
        CdMessageComponent,
        CdChangePasswordComponent,
        BlogSidebarComponent,
        JobsSidebarComponent,
        CdSidebarComponent,
        CdHeaderComponent,
        CdFooterComponent,
        RdPostJobComponent,
        RdManageJobsComponent,
        RdApplicantsComponent,
        RdMessagesComponent,
        RdProfileComponent,
        RdChangePasswordComponent,
        CdDocumentsComponent, 
        EvenementDashboardComponent,
        EvenementTemplateComponent,
        EvenementSidebarComponent,
        EvenementFormComponent,
        EvenementListComponent, 
        EvenementEditComponent,
        EvenementDetailComponent,
        EvenementHeaderComponent,
        AdminDashboardComponent,
        AdHeaderComponent,
        AdSidebarComponent,
        AdFooterComponent,
        AdDashboardComponent,
        PartenaireListComponent,
        OffreListComponent,
        EntretienListComponent,

        CandidatureListComponent,
        EvenementListAdminComponent,
        AdHeaderComponent,  
        AdSidebarComponent, 
        AdFooterComponent,
        EvenementCandidatComponent,
        EvenementDemandesComponent,
        MesParticipationsComponent,
        EvenementCalendrierComponent,
        MaCalendarComponent,
        EvenementFeedbacksComponent,
        FeedbackAdminComponent,
        FormationsAdminComponent,
        FormationCreateComponent,
        FormationEditComponent,
        FormationParticipantsComponent,
        MesFormationsComponent,
        ChatEvenementComponent,
        EvenementChatComponent,
        ParcoursCreateComponent,
        ParcoursFeedbackAdminComponent,
        
        
        
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        BrowserAnimationsModule,
        CarouselModule,
        NgApexchartsModule,
        NgxScrollTopModule,
        GoogleMapsModule,
        FullCalendarModule,
        SharedModule

        
        
        
        
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: LOCALE_ID, useValue: 'fr' },  // ← AJOUTER
    DatePipe, 
        
    ],
    bootstrap: [App],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }