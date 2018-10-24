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
    return this.httpClient.put(this._apiUrl + user.id, user);

  }




}
