import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {JobItem} from '../jobs/job-item';
import {User} from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class JobItemDataService {

  user: User;
  private selectedUser = new BehaviorSubject(this.user);
  currentUser = this.selectedUser.asObservable();

  s = {category: '', location: ''};
  private selectedStrings = new BehaviorSubject(this.s);
  currentS = this.selectedStrings.asObservable();

  jobItem: JobItem;
  private selectedJobItem = new BehaviorSubject(this.jobItem)
  currentJobItem = this.selectedJobItem.asObservable();

  constructor() { }

  changeMessage(jobitem: JobItem) {
    this.selectedJobItem.next(jobitem);
  }

  changeUser(user: User) {
    this.selectedUser.next(user);
  }

  changeStrings(s: any) {
    this.selectedStrings.next(s);
  }
}
