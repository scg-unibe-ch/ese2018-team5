import { Component, OnInit  } from '@angular/core';
import {JobItem} from '../jobs/job-item';
import {JobItemDataService} from './job-item-data.service';
import {JobService} from '../shared/service/job.service';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-jobpostingedit',
  templateUrl: './jobpostingedit.component.html',
  styleUrls: ['./jobpostingedit.component.css']
})
export class JobpostingeditComponent implements OnInit {

  selectedJobItem: JobItem;
  submitted = false;

  constructor(
    private data:JobItemDataService,
    private jobService:JobService,
    private router:Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.data.currentJobItem.subscribe(jobitem => this.selectedJobItem = jobitem);
  }

  onSubmit() {
    this.submitted = true;
    this.jobService.updateJob(this.selectedJobItem).subscribe();
    if(this.auth.getRole() === '4') {
      this.router.navigate(['/admin/jobpostings']);
    } else {
      this.router.navigate(['/jobpostingList']);
    }
  }

  cancel() {
    if(this.auth.getRole() === '4') {
      this.router.navigate(['/admin/jobpostings']);
    } else {
      this.router.navigate(['/jobpostingList']);
    }
  }
}
