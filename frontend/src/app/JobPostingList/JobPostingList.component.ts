import {Component, Input, OnInit} from '@angular/core';
import {JobService} from '../shared/service/job.service';
import {JobItem} from '../jobs/job-item';
import {Router} from '@angular/router';
import {JobItemDataService} from '../jobpostingedit/job-item-data.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-jobpostinglist',
  templateUrl: './JobPostingList.component.html',
  styleUrls: ['./JobPostingList.component.css']
})
export class JobPostingListComponent implements OnInit {

  @Input()
  jobItem: JobItem = new JobItem();
  userItems: JobItem[] = [];

  constructor(
    private jobService:JobService,
    private router:Router,
    private data:JobItemDataService,
    private auth:AuthService
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    const user = this.auth.getCurrentUser();
    this.jobService.getJobForUser(user).subscribe(result => {
      this.userItems = result.JobItems;
    },
      error => {
      this.userItems.length = 0;
      })
  }

  edit(jobItem:JobItem) {
    this.data.changeMessage(jobItem);
    this.router.navigate(['/JobPostingList/edit'])
  }

  delete(jobItem:JobItem) {
    this.jobService.deleteJob(jobItem).subscribe(() => {
      this.fetchData();
    })

  }

}
