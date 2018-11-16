import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient, private jwtHelper: JwtHelperService,private router:Router) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{token: string, role: string, userId: string}>('http://localhost:3000/api/authenticate', {username: username, password: password})
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.token);
          localStorage.setItem('role', result.role);
          localStorage.setItem('userId', result.userId);
          return true;
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }

  public isAdmin(): boolean {
    return (localStorage.getItem('role') == '4');
  }

  public isUser(): boolean {
    return (localStorage.getItem('role') == '2');
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
