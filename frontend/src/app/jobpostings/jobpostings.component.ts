import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {JobItem} from '../jobs/job-item';
import {HttpClient} from '@angular/common/http';
import {JobService} from '../shared/service/job.service';
import {AuthService} from '../auth.service';
import {JobItemDataService} from '../jobpostingedit/job-item-data.service';

@Component({
  selector: 'app-jobpostings',
  templateUrl: './jobpostings.component.html',
  styleUrls: ['./jobpostings.component.css']
})
export class JobPostingsComponent implements OnInit {

  private _apiUrl = 'http://localhost:3000/jobitem/';
  categories: string [] = ['Marketing', 'IT', 'Finance', 'Pharma'];
  locations: string [] = ['Bern', 'Solothurn', 'Zürich', 'Genf'];

  s = {category: '', location: ''};

  @Input()
  jobItem: JobItem = new JobItem();
  jobItems: JobItem[] = [];

  constructor(
    private httpClient: HttpClient,
    private jobService:JobService,
    public auth:AuthService,
    private data:JobItemDataService,
    private router:Router
) { }

  ngOnInit() {

    this.httpClient.get(this._apiUrl, {
    }).subscribe(result => {
      this.jobItems = result as JobItem[];
    });
  }

  setApproved(id:number) {
    this.jobItem = this.jobItems.find(jobItem => jobItem.id == id)
    this.jobService.updateJob(this.jobItem).subscribe()
  }

  submit(s) {
    this.data.changeStrings(s);
    this.router.navigate(['/search'])
  }
}
