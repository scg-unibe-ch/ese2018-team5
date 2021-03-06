import {Component, OnInit} from '@angular/core';
import {JobItem} from '../jobs/job-item';
import {JobService} from '../shared/service/job.service';
import {JobItemDataService} from '../jobpostingedit/job-item-data.service';
import {FilterPipe} from 'ngx-filter-pipe';

@Component({
  selector: 'app-searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./searchform.component.css']
})
export class SearchformComponent implements OnInit {

  s = {category: '', location: ''};

  pensumCount: number[] = [10,20,30,40,50,60,70,80,90,100];

  jobItemFilter: any = {
    title: '',
    position: '',
    company: '',
    pensum: '',
    location: '',
    category:'',
    description:'',
    approved:'true'
  };

  categories: string [] = ['Marketing', 'IT', 'Finance', 'Pharma'];
  locations: string [] = ['Bern', 'Solothurn', 'Zürich', 'Genf'];

  jobItems: JobItem[] = [];

  constructor(
    private jobService:JobService,
    private data:JobItemDataService,
    private filterPipe: FilterPipe
  ) { }

  ngOnInit() {
    this.data.currentS.subscribe( s => this.s = s);
    this.jobItemFilter.category = this.s.category;
    this.jobItemFilter.location = this.s.location;
    this.fetchData();
  }

  fetchData() {
    this.jobService.getJobs().subscribe(result => {
      this.jobItems = result as JobItem[];
    });
  }

}

