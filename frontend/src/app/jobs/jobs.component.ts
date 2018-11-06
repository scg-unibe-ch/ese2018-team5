import { Component, OnInit } from '@angular/core';
import {JobItem} from './job-item';
import {JobService} from '../shared/service/job.service';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],

})
export class JobsComponent implements OnInit {
  selectedJob: JobItem;

  onSaveData(){

  }
  constructor() { }

  ngOnInit() {
  }

}
