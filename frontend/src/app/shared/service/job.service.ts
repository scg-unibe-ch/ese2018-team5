import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JobItem} from '../../jobs/job-item';
import {Observable} from 'rxjs';
import {AuthService} from '../../auth.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private _apiUrl= 'http://localhost:3000/jobitem/';

  constructor(
    private httpClient: HttpClient,
    private auth: AuthService
  ) { }

  public update: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  getJobForUser(id:string): Observable<any> {
   return this.httpClient.get('http://localhost:3000/api/JobPostingList/' + id);
  }

  createJob(jobItem:JobItem): Observable<any> {
    this.update.emit(true); //Emits update to signal other components that the list has been locally updated and new items should be fetched from backend
    jobItem.userId = +this.auth.getId();
    return this.httpClient.post(this._apiUrl, jobItem);
  }

  deleteJob(jobItem:JobItem): Observable<any>{
    this.update.emit(true); //Emits update to signal other components that the list has been locally updated and new items should be fetched from backend

    return this.httpClient.delete(this._apiUrl + jobItem.id);
  }

  updateJob(jobItem:JobItem): Observable<any>{
    this.update.emit(true); //Emits update to signal other components that the list has been locally updated and new items should be fetched from backend
    return this.httpClient.put(this._apiUrl + jobItem.id, jobItem);
  }

  getJobs(): Observable<any>{
    return this.httpClient.get(this._apiUrl)
  }




}


