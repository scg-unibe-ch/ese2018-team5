import { Component, OnInit } from '@angular/core';
import {JobService} from '../shared/service/job.service';
import {JobItem} from '../jobs/job-item';
import {JobItemDataService} from '../jobpostingedit/job-item-data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-adminjobpostings',
  templateUrl: './adminjobpostings.component.html',
  styleUrls: ['./adminjobpostings.component.css']
})
export class AdminjobpostingsComponent implements OnInit {

  jobItem: JobItem = new JobItem();
  jobItems: JobItem[] = [];

  constructor(
    private jobService: JobService,
    private data:JobItemDataService,
    private router:Router
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.jobService.getJobs().subscribe( result => {
      this.jobItems = result.JobItems;
    },
      error => {
        this.jobItems.length = 0;
      })
  }

  setApproved(id:number) {
    this.jobItem = this.jobItems.find(jobItem => jobItem.id == id);
    this.jobService.updateJob(this.jobItem).subscribe();
  }

  edit(jobItem:JobItem) {
    this.data.changeMessage(jobItem);
    this.router.navigate(['/admin/jobpostings/edit']);
  }

  delete(jobItem:JobItem) {
    this.jobService.deleteJob(jobItem).subscribe(() => {
      this.fetchData();
    })
  }

}
