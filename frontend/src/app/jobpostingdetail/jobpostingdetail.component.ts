import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobItem} from '../jobs/job-item';
import {JobItemDataService} from '../jobpostingedit/job-item-data.service';
import {JobService} from '../shared/service/job.service';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-jobpostingdetail',
  templateUrl: './jobpostingdetail.component.html',
  styleUrls: ['./jobpostingdetail.component.css']
})
export class JobpostingdetailComponent implements OnInit {

  @Input() jobItems: JobItem[];
  @Input() admin = false;

  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  constructor(
    public auth:AuthService
  ) { }

  ngOnInit() {
  }

  editJob(jobItem:JobItem) {
    this.edit.emit(jobItem);
  }

  deleteJob(jobItem:JobItem) {
    this.delete.emit(jobItem);
  }

}
