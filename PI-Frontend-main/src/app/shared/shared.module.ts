import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NgxScrollTopModule } from 'ngx-scrolltop';

import { NavbarComponent } from '../common/navbar/navbar.component';
import { FooterComponent } from '../common/footer/footer.component';
import { SubscribeComponent } from '../common/subscribe/subscribe.component';
import { FaqComponent } from '../common/faq/faq.component';
import { DownloadAppComponent } from '../common/download-app/download-app.component';
import { HomeoneBannerComponent } from '../pages/home-demo-one/homeone-banner/homeone-banner.component';

import { RdHeaderComponent } from '../recruiter-dashboard/rd-header/rd-header.component';
import { RdFooterComponent } from '../recruiter-dashboard/rd-footer/rd-footer.component';
import { RdSidebarComponent } from '../recruiter-dashboard/rd-sidebar/rd-sidebar.component';
import { RecommendationWidgetComponent } from '../recruiter-dashboard/recommendation-widget/recommendation-widget.component';
import { AccountProfileComponent } from '../common/account-profile/account-profile.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SubscribeComponent,
    FaqComponent,
    DownloadAppComponent,
    HomeoneBannerComponent,
    RdHeaderComponent,
    RdFooterComponent,
    RdSidebarComponent,
    RecommendationWidgetComponent,
    AccountProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxScrollTopModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    SubscribeComponent,
    FaqComponent,
    DownloadAppComponent,
    HomeoneBannerComponent,
    RdHeaderComponent,
    RdFooterComponent,
    RdSidebarComponent,
    RecommendationWidgetComponent,
    AccountProfileComponent,
    NgxScrollTopModule,
    CommonModule,
    RouterModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}
