import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';
import {User} from './shared/models/user';
import {AlertService} from './shared/service/alert.service';
import {TranslateService} from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:User;
  token: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router:Router,
    private alertService:AlertService,
    public translate:TranslateService
  ) { }

  login(username: string, password:string): Observable<boolean> {
    return this.http.post<{token: string}>('http://localhost:3000/api/authenticate',
      {username: username, password: password})
      .pipe(
        map(result => {
          this.token = result.token;
          this.user = this.jwtHelper.decodeToken(result.token).user;
          this.translate.use(this.user.language);
          return true;
        })
      );

  }

  setToken(token:any) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  getCurrentUser() {
    return this.user;
  }

  setCurrentUser(user: User) {
    this.user = user;
  }

  logout() {
    this.token = null;
    this.user = null;
    this.alertService.success('Successfully logged out', true);
    this.router.navigate(['/login']);
  }

  public get loggedIn(): boolean {
    return this.token !== null;
  }

  public isAdmin(): boolean {
    if(this.user != null){
      return this.user.role == 4
    }
    return false;
  }

  public isUser(): boolean {
    if(this.user != null) {
      return this.user.role == 2;
    }
    return false;
  }

  public isAuthenticated(): boolean {
    if(this.token != null) {
      return !this.jwtHelper.isTokenExpired(this.token);
    }
    return false;
  }
}
