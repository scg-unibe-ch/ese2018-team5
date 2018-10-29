import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JobItem} from '../models/job-item';
import {ObjectUnsubscribedError, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private _apiUrl= 'http://localhost:3000/jobitem/';
  constructor(private httpClient: HttpClient) { }

  createJob(jobItem:JobItem): Observable<any> {
   return this.httpClient.put(this._apiUrl + jobItem.id, jobItem);
  }

  deleteJob(jobItem:JobItem): Observable<any>{
   return this.httpClient.delete(this._apiUrl + jobItem.id);
  }

  updateJob(jobItem:JobItem): Observable<any>{
    return this.httpClient.post(this._apiUrl + jobItem.id, jobItem);
  }
}
