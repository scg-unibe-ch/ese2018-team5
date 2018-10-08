import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobList} from '../job-list';
import {JobItem} from '../job-item';
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  @Input()
  jobList: JobList;
  jobItem: JobItem = new JobItem(null, null, '', false);
  jobItems: JobItem[] = [];
  @Output()
  destroy = new EventEmitter<JobList>();

  constructor(private httpClient: HttpClient) {

  }

  ngOnInit() {
    this.httpClient.get('http://localhost:3000/jobitem', {
      params:  new HttpParams().set('jobListId', '' + this.jobList.id)
    }).subscribe((instances: any) => {
      this.jobItems = instances.map((instance) => new JobItem(instance.id, instance.jobListId, instance.name, instance.done));
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
    this.jobItem.jobListId = this.jobList.id;
    this.httpClient.post('http://localhost:3000/jobitem', {
      'jobListId': this.jobItem.jobListId,
      'name': this.jobItem.name,
      'done': this.jobItem.done
    }).subscribe((instance: any) => {
      this.jobItem.id = instance.id;
      this.jobItems.push(this.jobItem);
      this.jobItem = new JobItem(null, this.jobList.id, '', false);
    });
  }

  onJobItemDestroy(jobItem: JobItem) {
    this.jobItems.splice(this.jobItems.indexOf(jobItem), 1);
  }

}
