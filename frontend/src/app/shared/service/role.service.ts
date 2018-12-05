import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthService} from '../../auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) : boolean {
    const expectedRole = route.data.expectedRole;

    if(!this.auth.isAuthenticated() || this.auth.getRole() < expectedRole ) {
      this.auth.logout();
        this.router.navigate(['/login']);
        return false;

    }
    return true;
  }
}
