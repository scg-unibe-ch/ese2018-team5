import {Component, Input, OnInit} from '@angular/core';

import {JobItem} from '../jobs/job-item';
import {HttpClient} from '@angular/common/http';
import {JobService} from '../shared/service/job.service';
import {AuthService} from '../auth.service';
import {DatePipe} from '@angular/common';
import { registerLocaleData} from '@angular/common';
import localeCH from '@angular/common/locales/de-CH';
registerLocaleData(localeCH);

@Component({
  selector: 'app-pseude-jobs',
  templateUrl: './pseude-jobs.component.html',
  styleUrls: ['./pseude-jobs.component.css']
})
export class PseudeJobsComponent implements OnInit {

  private _apiUrl = 'http://localhost:3000/jobitem/';

  @Input()
  jobItem: JobItem = new JobItem();
  jobItems: JobItem[] = [];

  constructor(private httpClient: HttpClient, private jobService:JobService, public auth:AuthService) { }

  ngOnInit() {
    this.httpClient.get(this._apiUrl, {
    }).subscribe(result => {
      this.jobItems = result as JobItem[];
    });
  }

  setApproved(id:number) {
    this.jobItem = this.jobItems.find(jobItem => jobItem.id == id)
    this.jobService.updateJob(this.jobItem).subscribe()
  }



}
