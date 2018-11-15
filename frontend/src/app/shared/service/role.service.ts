import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../../auth.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) : boolean {
    const expectedRole = route.data.expectedRole;

    const role = localStorage.getItem('role');

    if(!this.auth.isAuthenticated() || role < expectedRole ) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
