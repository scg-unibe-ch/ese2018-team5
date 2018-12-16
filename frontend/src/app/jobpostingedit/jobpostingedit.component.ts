import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobItem} from '../jobs/job-item';
import {JobItemDataService} from './job-item-data.service';
import {JobService} from '../shared/service/job.service';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-jobpostingedit',
  templateUrl: './jobpostingedit.component.html',
  styleUrls: ['./jobpostingedit.component.css']
})
export class JobpostingeditComponent implements OnInit {

  @Input() selectedJobItem: JobItem;

  @Output() cancelEdit = new EventEmitter();
  @Output() submitEdit = new EventEmitter();


  categories: string [] = ['Marketing', 'IT', 'Finance', 'Pharma'];
  locations: string [] = ['Bern', 'Solothurn', 'Zürich', 'Genf'];
  pensumCount: number[] = [10,20,30,40,50,60,70,80,90,100];

  constructor(
    private jobService:JobService
  ) { }

  ngOnInit() {

  }

  onSubmit() {
    this.jobService.updateJob(this.selectedJobItem).subscribe();
    this.submitEdit.emit();
  }

  cancel() {
    this.cancelEdit.emit();
  }
}
