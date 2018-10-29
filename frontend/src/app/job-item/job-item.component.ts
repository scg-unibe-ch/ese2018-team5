import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobItem} from '../shared/models/job-item';
import {HttpClient} from '@angular/common/http';
import {JobService} from '../shared/service/job.service';

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.css']
})
export class JobItemComponent implements OnInit {



  @Input()
  jobItem: JobItem;
  @Output()
  destroy = new EventEmitter<JobItem>();

  constructor(private jobService: JobService) {
  }

  ngOnInit() {
  }

  onSave() {
   this.jobService.createJob(this.jobItem).subscribe();
  }




  onDestroy() {
    this.jobService.deleteJob(this.jobItem).subscribe(() => {
      this.destroy.emit(this.jobItem);
    });
  }

}
