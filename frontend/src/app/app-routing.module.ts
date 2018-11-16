import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { JobPostingsComponent} from './jobpostings/jobpostings.component';
import {RegisterComponent} from './register/register.component';

import { RoleGuard} from './shared/service/role.service';


import {JobsComponent} from './jobs/jobs.component';
import {ProfileComponent} from './profile/profile.component';
import {JobpostingeditComponent} from './jobpostingedit/jobpostingedit.component';
import {UserlistComponent} from './userlist/userlist.component';


const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'jobform',
    component: JobsComponent
  },

  {
    path: 'dashboard',
    component: JobPostingsComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: '2'
    }
  },

  {
    path: 'profile/edit',
    component: JobpostingeditComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: '2'
    }
  },

  {
    path: 'admin',
    component: UserlistComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: '4'
    }
  },


  // otherwise redirect to home
  { path: '**', redirectTo: '/login' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
