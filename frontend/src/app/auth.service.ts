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
          this.setToken(result.token);
          this.user = this.jwtHelper.decodeToken(result.token).user;
          localStorage.setItem('role', this.user.role.toString());
          localStorage.setItem('lang', this.user.language);
          localStorage.setItem('id', this.user.id.toString());
          this.translate.use(this.user.language);
          return true;
        })
      );

  }

  setToken(token:any) {
    localStorage.setItem('token', token);
  }

  getRole() {
    return localStorage.getItem('role');
  }

  getLanguage() {
    return localStorage.getItem('lang');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
    this.alertService.success('Successfully logged out', false);
    this.router.navigate(['/login']);
  }

  public get loggedIn(): boolean {
    return this.getToken() !== null;
  }

  public isAdmin(): boolean {
    return this.getRole() === '4';
  }

  public isUser(): boolean {
    return this.getRole() === '2';
  }

  public isAuthenticated(): boolean {
    if(this.getToken() != null) {
      return !this.jwtHelper.isTokenExpired(this.getToken());
    }
    return false;
  }

  getId() {
    return localStorage.getItem('id');
  }
}
