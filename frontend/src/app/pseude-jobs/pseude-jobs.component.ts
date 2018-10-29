import {Component, Input, OnInit} from '@angular/core';

import {JobItem} from '../shared/models/job-item';
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-pseude-jobs',
  templateUrl: './pseude-jobs.component.html',
  styleUrls: ['./pseude-jobs.component.css']
})
export class PseudeJobsComponent implements OnInit {

  @Input()
  jobItem: JobItem = new JobItem(null, '', '', '',null,'','',null);
  jobItems: JobItem[] = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get('http://localhost:3000/jobitem', {

    }).subscribe((instances: any) => {
      this.jobItems = instances.map((instance) =>
        new JobItem(instance.id, instance.title, instance.company, instance.location, instance.date,
          instance.description, instance.position , instance.pensum));
    });
  }

}
