import {Component, Input, OnInit} from '@angular/core';

import {JobItem} from '../shared/models/job-item';
import {HttpClient} from '@angular/common/http';
import {JobService} from '../shared/service/job.service';

@Component({
  selector: 'app-pseude-jobs',
  templateUrl: './pseude-jobs.component.html',
  styleUrls: ['./pseude-jobs.component.css']
})
export class PseudeJobsComponent implements OnInit {

  private _apiUrl = 'http://localhost:3000/jobitem/';

  @Input()
  jobItem: JobItem = new JobItem(null, '', '', '',null,'','',null, false);
  jobItems: JobItem[] = [];

  constructor(private httpClient: HttpClient, private jobService:JobService) { }

  ngOnInit() {
    this.httpClient.get(this._apiUrl, {

    }).subscribe((instances: any) => {
      this.jobItems = instances.map((instance) =>
        new JobItem(instance.id, instance.title, instance.company, instance.location, instance.date,
          instance.description, instance.position , instance.pensum, instance.approved));
    });
  }

  setApproved(id:number) {
    this.jobItem = this.jobItems.find(jobItem => jobItem.id == id)
    this.jobService.updateJob(this.jobItem).subscribe()
  }

}
