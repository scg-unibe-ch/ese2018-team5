import { Component, OnInit } from '@angular/core';
import {JobItem} from './job-item';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  selectedJob: JobItem;
  constructor() { }

  ngOnInit() {
  }

}
