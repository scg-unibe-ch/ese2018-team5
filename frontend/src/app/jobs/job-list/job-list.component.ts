import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobList} from '../../shared/models/job-list';
import {JobItem} from '../job-item';
import {HttpClient, HttpParams} from '@angular/common/http';
import {JobService} from '../../shared/service/job.service';


@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  @Output() jobWasSelected = new EventEmitter<JobItem>();
  jobs: JobItem [];



  jobItem: JobItem = new JobItem();
  jobItems: JobItem[] = [];
  @Output()
  destroy = new EventEmitter<JobList>();

  constructor(private httpClient: HttpClient,
              private jobService: JobService) {
 /*   this.jobs = [new JobItem(1, 'lolz', 'credit suisse', 'lohn ammannsegg',null,'test','',50, true),
      new JobItem(1, 'tester', 'credit suisse', 'lohn ammannsegg',null,'test','',50, true),
      new JobItem(1, 'tester', 'credit suisse', 'lohn ammannsegg',null,'test','',50, true),
    ]
    */
  }

  ngOnInit() {
   this.getJobs();
   this.jobService.update.subscribe(update =>{
     console.log("Updating JobList");
     this.getJobs();
   })
  }

  getJobs(){
    this.jobService.getJobs(1).subscribe(result =>{
      this.jobs = result;
    })
  }

  onJobSelected(job: JobItem){
  this.jobWasSelected.emit(this.jobItem)
    console.log("Job has been selected: %o",job);
  }
/*
  onSave() {
    this.httpClient.put('http://localhost:3000/joblist/' + this.jobList.id, {
      'name': this.jobList.name
    }).subscribe();
  }

  onDestroy() {
    this.httpClient.delete('http://localhost:3000/joblist/' + this.jobList.id).subscribe(() => {
      this.destroy.emit(this.jobList);
    });
  }
*/
  onJobItemCreate() {

/*    this.httpClient.post('http://localhost:3000/jobitem', {

      'title': this.jobItem.title,
      'description': this.jobItem.description,
      'skills': this.jobItem.skills
    }).subscribe((instance: any) => {
      this.jobItem.id = instance.id;
      this.jobItems.push(this.jobItem);
      this.jobItem = instance;
    });*/
  }

  onJobItemDestroy(jobItem: JobItem) {
    this.jobItems.splice(this.jobItems.indexOf(jobItem), 1);
  }

}
