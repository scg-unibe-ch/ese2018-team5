import { Component, OnInit  } from '@angular/core';
import {JobItem} from '../jobs/job-item';
import {JobItemDataService} from './job-item-data.service';
import {JobService} from '../shared/service/job.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-jobpostingedit',
  templateUrl: './jobpostingedit.component.html',
  styleUrls: ['./jobpostingedit.component.css']
})
export class JobpostingeditComponent implements OnInit {

  selectedJobItem: JobItem;

  submitted = false;

  constructor(private data:JobItemDataService, private jobService:JobService, private router:Router) { }

  ngOnInit() {
    this.data.currentJobItem.subscribe(jobitem => this.selectedJobItem = jobitem);
  }

  onSubmit() {
    this.submitted = true;
    this.jobService.updateJob(this.selectedJobItem).subscribe();
    this.router.navigate(['/profile'])
  }

}
