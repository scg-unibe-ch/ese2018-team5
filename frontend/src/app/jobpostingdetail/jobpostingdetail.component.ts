import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {JobItem} from '../jobs/job-item';
import {JobService} from '../shared/service/job.service';
import {AuthService} from '../auth.service';
import {FormControl} from '@angular/forms';
import {FilterPipe} from 'ngx-filter-pipe';

@Component({
  selector: 'app-jobpostingdetail',
  templateUrl: './jobpostingdetail.component.html',
  styleUrls: ['./jobpostingdetail.component.css']
})
export class JobpostingdetailComponent implements OnInit {

  @Input() jobItems: JobItem[];
  @Input() admin = false;
  @Input() editable = false;

  @Output() update = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() filter = new EventEmitter();

  states: States[] = [
    {value: 'all', viewValue: 'All Jobpostings'},
    {value: 'approved', viewValue: 'Approved Jobpostings'},
    {value: 'unapproved',viewValue: 'Unapproved Jobpostings'},
  ];

  selectedState = 'all';

  editJob = false;
  selectedJobItem: JobItem;

  jobItemFilter: any = {

  };

  constructor(
    public auth:AuthService,
    private jobService:JobService
  ) { }

  ngOnInit() {

  }

  filtering() {
    switch(this.selectedState) {

      case 'approved': {
        this.jobItemFilter.approved = true;
        this.filter.emit(this.jobItemFilter);
        break;
      }
      case 'unapproved': {
        this.jobItemFilter.approved = false;
        this.filter.emit(this.jobItemFilter);
        break;
      }

      default: {
        this.deleteApproved();
        this.filter.emit(this.jobItemFilter);
        break;
      }
    }
  }


  deleteApproved() {
    delete this.jobItemFilter['approved'];
  }

  updateJobItem(jobItem: JobItem) {
    this.jobService.updateJob(jobItem).subscribe();
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

  trackByIdx(index:number, item:JobItem): any {
    return item.id;
  }
}

export interface States {
  value: string;
  viewValue: string;
}
