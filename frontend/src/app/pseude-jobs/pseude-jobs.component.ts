import { Component, OnInit } from '@angular/core';

import {Job} from '../JobPosts/Job';
import { JOBS } from '../JobPosts/mock-jobs';

@Component({
  selector: 'app-pseude-jobs',
  templateUrl: './pseude-jobs.component.html',
  styleUrls: ['./pseude-jobs.component.css']
})
export class PseudeJobsComponent implements OnInit {

  jobPostings = JOBS;

  constructor() { }

  ngOnInit() {
  }

}
