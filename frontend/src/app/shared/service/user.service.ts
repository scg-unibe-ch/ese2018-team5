import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _apiUrl= 'http://localhost:3000/api/';
  constructor(private httpClient: HttpClient) { }

  createUser(user:User):Observable<any> {
    return this.httpClient.post(this._apiUrl + 'signup', user);
  }

  deleteUser(user:User):Observable<any> {
    return this.httpClient.delete(this._apiUrl + user.id);
  }

  updateUser(user:User):Observable<any> {
    return this.httpClient.put(this._apiUrl + user.id, user);
  }

  getUser(user:User):Observable<any> {
    return this.httpClient.get(this._apiUrl + user.id);
  }

  getUsers(): Observable<any> {
    return this.httpClient.get(this._apiUrl);
  }

  authenticateUser(user:User):Observable<any> {
    return this.httpClient.post(this._apiUrl + 'authenticate', user);
  }



}
