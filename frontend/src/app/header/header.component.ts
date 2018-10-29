import { Component, OnInit } from '@angular/core';
import {JOBS} from '../JobPosts/mock-jobs';
import {JobList} from '../shared/models/job-list';
import {Job} from '../JobPosts/Job';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  title = 'Need a job?';

  constructor() { }

  ngOnInit() {
  }



}
