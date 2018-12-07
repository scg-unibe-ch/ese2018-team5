import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobItem} from '../jobs/job-item';
import {JobItemDataService} from '../jobpostingedit/job-item-data.service';
import {JobService} from '../shared/service/job.service';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {FormControl} from '@angular/forms';
import {b} from '@angular/core/src/render3';

@Component({
  selector: 'app-jobpostingdetail',
  templateUrl: './jobpostingdetail.component.html',
  styleUrls: ['./jobpostingdetail.component.css']
})
export class JobpostingdetailComponent implements OnInit {

  @Input() jobItems: JobItem[];
  @Input() admin = false;
  @Input() editable = false;

  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  chosen = new FormControl();

  jobItemFilter: any = {

  };

  constructor(
    public auth:AuthService,
    private jobService:JobService
  ) { }

  ngOnInit() {

  }

  filtering() {

    switch(this.chosen.value) {
      case 'true': {
        this.jobItemFilter.approved = true;
        break;
      }
      case 'false': {
        this.jobItemFilter.approved = false;
        break;
      }
      default: {
        this.deleteApproved();
        break;
      }
    }
  }


  deleteApproved() {
    delete this.jobItemFilter['approved'];
  }

  flipApproved(jobItem: JobItem) {
    this.jobService.updateJob(jobItem).subscribe(result => {

      //let nr = this.jobItems.indexOf(jobItem);
      //this.jobItems[nr] = result as JobItem;

    });

  }

  editJob(jobItem:JobItem) {
    this.edit.emit(jobItem);
  }

  deleteJob(jobItem:JobItem) {
    this.delete.emit(jobItem);
  }

}
