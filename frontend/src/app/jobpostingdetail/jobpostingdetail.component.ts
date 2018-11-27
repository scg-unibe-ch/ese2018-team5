import {Component, Input, OnInit} from '@angular/core';
import {JobItem} from '../jobs/job-item';

@Component({
  selector: 'app-jobpostingdetail',
  templateUrl: './jobpostingdetail.component.html',
  styleUrls: ['./jobpostingdetail.component.css']
})
export class JobpostingdetailComponent implements OnInit {

  @Input() jobItem: JobItem;

  constructor() { }

  ngOnInit() {
  }

}
