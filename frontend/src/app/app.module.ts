import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import { JwtModule } from '@auth0/angular-jwt'; // Import JWT module
import { AuthService } from './auth.service'; //Import a authentication service
import { AuthGuard } from './auth.guard'; //Import a authentication guard

import {AppRoutingModule} from './app-routing.module';

// Add css components from angular material
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatIcon, MatIconModule,
  MatInputModule,
  MatListModule
} from '@angular/material';

import { JobListComponent } from './job-list/job-list.component';
import { JobItemComponent } from './job-item/job-item.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import {JobService} from './shared/service/job.service';
import { HeaderComponent } from './header/header.component';
import { PseudeJobsComponent } from './pseude-jobs/pseude-jobs.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {UserService} from './shared/service/user.service';
import { JobFormComponent } from './job-form/job-form.component';

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
    PseudeJobsComponent,
    LoginComponent,
    RegisterComponent,
    JobFormComponent,

  ],
  imports: [
    BrowserModule,
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
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
