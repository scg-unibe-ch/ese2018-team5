import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import {PseudeJobsComponent} from './pseude-jobs/pseude-jobs.component';
import {RegisterComponent} from './register/register.component';

import { AuthGuard } from './auth.guard';
import { RoleGuard} from './shared/service/role.service';


const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'dashboard',
    component: PseudeJobsComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'admin',
    component: RegisterComponent,
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
