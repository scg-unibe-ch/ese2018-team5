import {Component, Input, OnInit} from '@angular/core';
import {JobService} from '../shared/service/job.service';
import {JobItem} from '../jobs/job-item';
import {Router} from '@angular/router';
import {JobItemDataService} from '../jobpostingedit/job-item-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input()
  jobItem: JobItem = new JobItem();
  userItems: JobItem[] = [];

  constructor(private jobService:JobService, private router:Router, private data:JobItemDataService) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    const id = localStorage.getItem('userId');
    this.jobService.getJobForUser(id).subscribe(result => {
      this.userItems = result.JobItems;
    })
  }

  edit(jobItem:JobItem) {
    this.data.changeMessage(jobItem);
    this.router.navigate(['/profile/edit'])
  }

  delete(jobItem:JobItem) {
    this.jobService.deleteJob(jobItem).subscribe(() => {
      this.fetchData();
    })
  }

}
