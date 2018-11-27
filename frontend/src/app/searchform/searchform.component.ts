import {Component, OnInit} from '@angular/core';
import {JobItem} from '../jobs/job-item';
import {JobService} from '../shared/service/job.service';
import {FilterPipe} from 'ngx-filter-pipe';

@Component({
  selector: 'app-searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./searchform.component.css']
})
export class SearchformComponent implements OnInit {

  jobItemFilter: any = {
    title: '',
    position: '',
    company: '',
    pensum: '',
    location: '',
    category:''
  };

  categories: string [] = ['Marketing', 'IT', 'Finance', 'Pharma'];
  locations: string [] = ['Bern', 'Solothurn', 'Zürich', 'Genf'];

  private undefined:any;

  jobItems: JobItem[] = [];

  constructor(private jobService:JobService, private filter:FilterPipe) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.jobService.getJobs(1).subscribe(result => {
      this.jobItems = result as JobItem[];
    });
  }

}

