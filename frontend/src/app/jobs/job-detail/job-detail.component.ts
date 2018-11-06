import {Component, Input, OnInit} from '@angular/core';
import {JobItem} from '../job-item';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  @Input () job: JobItem;
  constructor() { }

  ngOnInit() {
  }

}
