import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './login/login.component';
import {PseudeJobsComponent} from './pseude-jobs/pseude-jobs.component';

import { AuthGuard } from './auth.guard';
//import {RegisterComponent} from './register/register.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: PseudeJobsComponent},
 // { path: 'register', component: RegisterComponent},


  // otherwise redirect to home
  { path: '**', redirectTo: '/dashboard' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
