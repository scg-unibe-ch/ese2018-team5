import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobItem} from '../jobs/job-item';
import {JobService} from '../shared/service/job.service';
import {AuthService} from '../auth.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-jobpostingdetail',
  templateUrl: './jobpostingdetail.component.html',
  styleUrls: ['./jobpostingdetail.component.css']
})
export class JobpostingdetailComponent implements OnInit {

  @Input() jobItems: JobItem[];
  @Input() admin = false;
  @Input() editable = false;

  @Output() delete = new EventEmitter();

  editJob = false;
  selectedJobItem: JobItem;

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
      case true: {
        this.jobItemFilter.approved = true;
        break;
      }
      case false: {
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

    });

  }

  cancelEdit() {
    this.editJob = false;
  }

  submitEdit() {
    this.editJob = false;
  }

  editJobItem(jobItem:JobItem) {
    this.editJob = true;
    this.selectedJobItem = jobItem;
  }

  deleteJob(jobItem:JobItem) {
    this.delete.emit(jobItem);
  }

}
