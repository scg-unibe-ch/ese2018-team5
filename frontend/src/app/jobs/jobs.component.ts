import { Component, OnInit } from '@angular/core';
import {JobItem} from './job-item';
import {JobService} from '../shared/service/job.service';
import {AlertService} from '../shared/service/alert.service';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],

})
export class JobsComponent implements OnInit {
  selectedJob: JobItem;
  formJob: JobItem = new JobItem();

  categories: string [] = ['Marketing', 'IT', 'Finance', 'Pharma'];
  locations: string [] = ['Bern', 'Solothurn', 'Zürich', 'Genf'];
  pensumCount: number[] = [10,20,30,40,50,60,70,80,90,100];


  constructor(
    private jobService: JobService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  onSaveData(job:JobItem){
    this.jobService.createJob(job).subscribe(res=>{
      console.log("Creating job %o",job)
      //Do muess me jeds update Triggere im angere component das er d liste neu holt

      this.alertService.success('Successfully created jobposting', false)
    })
  }



  onDeleteJob(job:JobItem){
    this.jobService.deleteJob(job).subscribe(res=>{
      console.log("deleting job %o",job)
    })
  }

}
