import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import {AuthService} from '../../auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) : boolean {
    const expectedRole = route.data.expectedRole;

    if(this.auth.getCurrentUser() !== null) {
      const role = this.auth.getCurrentUser().role;
      
      if(!this.auth.isAuthenticated() || role < expectedRole ) {
        this.router.navigate(['/login']);
        return false;
      }
    }



    return true;
  }
}
