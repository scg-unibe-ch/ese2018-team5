import {Component, Input, OnInit} from '@angular/core';
import {GrdFilterPipe} from './grd-filter.pipe';
import {JobItem} from '../jobs/job-item';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./searchform.component.css']
})
export class SearchformComponent implements OnInit {
  public searchText : string;
  public customerData : any;
  private _apiUrl = 'http://localhost:3000/jobitem/';

  @Input()
  jobItem: JobItem = new JobItem();
  jobItems: JobItem[] = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {

    this.httpClient.get(this._apiUrl, {
    }).subscribe(result => {
      this.jobItems = result as JobItem[];
    });
  }

}

