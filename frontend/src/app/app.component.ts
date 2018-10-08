import {Component, OnInit} from '@angular/core';
import {JobList} from './shared/models/job-list';
import {JobItem} from './shared/models/job-item';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 ngOnInit(){}
}
