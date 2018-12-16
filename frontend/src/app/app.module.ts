import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt'; // Import JWT module
import { AuthService } from './auth.service'; //Import a authentication service
import { AuthGuard } from './auth.guard'; //Import a authentication guard
import {AppRoutingModule} from './app-routing.module';
import {FilterPipeModule} from 'ngx-filter-pipe';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {
  MatMenuModule,
  MatSliderModule,
  MatSortModule,
  MatTableModule,
  MatPaginator,
  MatPaginatorModule
} from '@angular/material';
import {HttpInterceptorService} from './shared/service/http-interceptor.service';
// Add css components from angular material
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatIcon, MatIconModule,
  MatInputModule,
  MatListModule,
  MatGridListModule, MatSelectModule
} from '@angular/material';

import { JobListComponent } from './jobs/job-list/job-list.component';
import { JobItemComponent } from './jobs/job-list/job-item/job-item.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import {JobService} from './shared/service/job.service';
import { HeaderComponent } from './header/header.component';
import { JobPostingsComponent } from './jobpostings/jobpostings.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {UserService} from './shared/service/user.service';
import { JobsComponent } from './jobs/jobs.component';
import { JobDetailComponent } from './jobs/job-detail/job-detail.component';
import { registerLocaleData} from '@angular/common';
import localeCH from '@angular/common/locales/de-CH';
import { AlertComponent } from './alert/alert.component';
import {AlertService} from './shared/service/alert.service';
import { SearchformComponent } from './searchform/searchform.component';
import { JobPostingListComponent } from './JobPostingList/JobPostingList.component';
import { JobpostingeditComponent } from './jobpostingedit/jobpostingedit.component';
import { UserlistComponent } from './userlist/userlist.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { AdminjobpostingsComponent } from './adminjobpostings/adminjobpostings.component';
import { JobpostingdetailComponent } from './jobpostingdetail/jobpostingdetail.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { AlertBoxComponent } from './alert-box/alert-box.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TipsComponent } from './tips/tips.component';
import { ServiceComponent } from './service/service.component';
registerLocaleData(localeCH);

//function to get a token
export function tokenGetter() {
  return localStorage.getItem('access_token');
}



@NgModule({
  declarations: [
    AppComponent,
    JobListComponent,
    JobItemComponent,
    DashboardComponent,
    HeaderComponent,
    JobPostingsComponent,
    LoginComponent,
    RegisterComponent,
    JobsComponent,
    JobDetailComponent,
    AlertComponent,
    SearchformComponent,
    JobPostingListComponent,
    JobpostingeditComponent,
    UserlistComponent,
    UserprofileComponent,
    AdminjobpostingsComponent,
    JobpostingdetailComponent,
    ChangepasswordComponent,
    BodyComponent,
    FooterComponent,
    AlertBoxComponent,
    AboutUsComponent,
    TipsComponent,
    ServiceComponent

  ],
  imports: [
    BrowserModule,
    MatSliderModule,
    FilterPipeModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    AppRoutingModule,
    MatGridListModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    MatPaginatorModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),

    //import of the jwt mdule

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3000'],
       // blacklistedRoutes: ['localhost:4000/api/auth']
      }
    })

  ],
  providers: [
    JobService,
    UserService,
    AuthService,
    AuthGuard,
    AlertService,
    FilterPipeModule,
    [HttpInterceptorService, {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }]
  ],
  bootstrap: [AppComponent]
})



export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
