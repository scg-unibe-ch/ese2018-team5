import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { JobPostingsComponent} from './jobpostings/jobpostings.component';
import {RegisterComponent} from './register/register.component';

import { RoleGuard} from './shared/service/role.service';


import {JobsComponent} from './jobs/jobs.component';
import {JobPostingListComponent} from './JobPostingList/JobPostingList.component';
import {JobpostingeditComponent} from './jobpostingedit/jobpostingedit.component';
import {UserlistComponent} from './userlist/userlist.component';
import {UserprofileComponent} from './userprofile/userprofile.component';
import {SearchformComponent} from './searchform/searchform.component';
import {AdminjobpostingsComponent} from './adminjobpostings/adminjobpostings.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {TipsComponent} from './tips/tips.component';
import {ServiceComponent} from './service/service.component';


const routes: Routes = [

  {
    path: 'search',
    component: SearchformComponent
  },

  {
    path: 'about',
    component: AboutUsComponent
  },

  {
    path: 'tips',
    component: TipsComponent
  },

  {
    path: 'service',
    component: ServiceComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'jobform',
    component: JobsComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: '2'
    }
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
    path: 'jobpostingList',
    component: JobPostingListComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: '2'
    }
  },

  {
    path: 'JobPostingList/edit',
    component: JobpostingeditComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: '2'
    }
  },

  {
    path: 'profile/:id',
    component: UserprofileComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: '2'
    }
  },

  {
    path: 'admin/jobpostings',
    component: AdminjobpostingsComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: '4'
    }
  },

  {
    path: 'admin/jobpostings/edit',
    component: JobpostingeditComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: '2'
    }
  },

  {
    path: 'admin/users',
    component: UserlistComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: '4'
    }
  },


  // otherwise redirect to home
  { path: '**', redirectTo: '/dashboard' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
