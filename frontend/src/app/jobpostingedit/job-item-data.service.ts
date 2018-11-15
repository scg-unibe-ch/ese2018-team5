import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {JobItem} from '../jobs/job-item';

@Injectable({
  providedIn: 'root'
})
export class JobItemDataService {

  jobItem: JobItem;
  private selectedJobItem = new BehaviorSubject(this.jobItem)
  currentJobItem = this.selectedJobItem.asObservable();

  constructor() { }

  changeMessage(jobitem: JobItem) {
    this.selectedJobItem.next(jobitem);
  }
}
