import {Component, Input, OnInit} from '@angular/core';
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

  categories: string [] = ['Marketing', 'IT', 'Finance', 'Pharma'];
  locations: string [] = ['Bern', 'Solothurn', 'Zürich', 'Genf'];
  pensumCount: number[] = [10,20,30,40,50,60,70,80,90,100];

  constructor(
    private data:JobItemDataService,
    private jobService:JobService,
    private router:Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    if(localStorage.getItem('job') == undefined) {
      this.data.currentJobItem.subscribe(jobitem => this.selectedJobItem = jobitem);
      localStorage.setItem('job', JSON.stringify(this.selectedJobItem));
    } else {
      this.selectedJobItem = JSON.parse(localStorage.getItem('job'));
    }

  }

  onSubmit() {
    localStorage.removeItem('job');
    this.jobService.updateJob(this.selectedJobItem).subscribe();
    if(this.auth.isAdmin()) {
      this.router.navigate(['/admin/jobpostings']);
    } else {
      this.router.navigate(['/jobpostingList']);
    }
  }

  cancel() {
    localStorage.removeItem('job');
    if(this.auth.isAdmin()) {
      this.router.navigate(['/admin/jobpostings']);
    } else {
      this.router.navigate(['/jobpostingList']);
    }
  }
}
