import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _apiUrl= 'http://localhost:3000/api/';
  public update: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  constructor(private httpClient: HttpClient) { }

  pw = {password: ''};

  createUser(user:User):Observable<any> {
    this.update.emit(true);
    return this.httpClient.post(this._apiUrl + 'signup', user);
  }

  deleteUser(user:User):Observable<any> {
    this.update.emit(true);
    return this.httpClient.delete(this._apiUrl + user.id);
  }

  updateUser(user:User):Observable<any> {
    this.update.emit(true);
    return this.httpClient.put(this._apiUrl + user.id, user);
  }

  patchUserPassword(user:User, password:string):Observable<any> {
    this.update.emit(true);
    this.pw.password = password;
    return this.httpClient.put(this._apiUrl+ 'pw/' + user.id, this.pw)
  }

  patchUserWithOutPW(user:User):Observable<any> {
    this.update.emit(true);
    delete user['password'];
    return this.httpClient.patch(this._apiUrl+user.id, user)
  }

  getUser(id:string):Observable<any> {
    return this.httpClient.get(this._apiUrl + id);
  }

  getUsers(): Observable<any> {
    return this.httpClient.get(this._apiUrl);
  }

  authenticateUser(user:User):Observable<any> {
    return this.httpClient.post(this._apiUrl + 'authenticate', user);
  }



}
