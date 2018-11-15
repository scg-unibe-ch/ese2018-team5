import {Component, Input, OnInit} from '@angular/core';

import {JobItem} from '../jobs/job-item';
import {HttpClient} from '@angular/common/http';
import {JobService} from '../shared/service/job.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-jobpostings',
  templateUrl: './jobpostings.component.html',
  styleUrls: ['./jobpostings.component.css']
})
export class JobPostingsComponent implements OnInit {

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
    let userItem: JobItem[] = [];
    this.jobService.getJobForUser()

  }

  setApproved(id:number) {
    this.jobItem = this.jobItems.find(jobItem => jobItem.id == id)
    this.jobService.updateJob(this.jobItem).subscribe()
  }



}
