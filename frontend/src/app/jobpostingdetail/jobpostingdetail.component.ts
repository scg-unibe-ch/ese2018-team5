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

  editJob = false;
  selectedJobItem: JobItem;

  oldJobItems: JobItem[];

  chosen = new FormControl();
  jobItemFilter: any = {

  };

  constructor(
    public auth:AuthService,
    private jobService:JobService,
    private filterPipe: FilterPipe
  ) { }

  ngOnInit() {
    this.oldJobItems = this.jobItems;
    this.oldJobItems.forEach(function (v) {
      console.log(v);
    })
  }

  filtering() {

    switch(this.chosen.value) {
      case true: {
        this.jobItemFilter.approved = true;
        this.applyFilter();
        break;
      }
      case false: {
        this.jobItemFilter.approved = false;
        this.applyFilter();
        break;
      }
      default: {
        this.deleteApproved();
        this.jobItems = this.oldJobItems;
        break;
      }
    }
  }


  deleteApproved() {
    delete this.jobItemFilter['approved'];
  }

  flipApproved(jobItem: JobItem) {
    console.log(jobItem);
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

  applyFilter() {
    this.jobItems = this.filterPipe.transform(this.jobItems, this.jobItemFilter);
  }

}
