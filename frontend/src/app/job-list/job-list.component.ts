import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobList} from '../shared/models/job-list';
import {JobItem} from '../shared/models/job-item';
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  @Input()
  jobList: JobList;
  jobItem: JobItem = new JobItem(null, '', '', '',null,'','',null);
  jobItems: JobItem[] = [];
  @Output()
  destroy = new EventEmitter<JobList>();

  constructor(private httpClient: HttpClient) {

  }

  ngOnInit() {
    this.httpClient.get('http://localhost:3000/jobitem', {
      params:  new HttpParams().set('jobListId', '' + this.jobList.id)
    }).subscribe((instances: any) => {
      this.jobItems = instances.map((instance) =>
        new JobItem(instance.id, instance.title, instance.company, instance.location, instance.date,
          instance.description, instance.position , instance.pensum));
    });
  }

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
