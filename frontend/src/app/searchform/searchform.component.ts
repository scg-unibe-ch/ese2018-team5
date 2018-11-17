import { Component, OnInit } from '@angular/core';
import {GrdFilterPipe} from './grd-filter.pipe';

@Component({
  selector: 'app-searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./searchform.component.css']
})
export class SearchformComponent implements OnInit {
  public searchText : string;
  public customerData : any;

  constructor() { }

  ngOnInit() {
    this.customerData = [
      {"id": 1, "title": 'abc', "company" :'xxx'},
      {"id": 2, "title": 'ace' , "company" :'xyz'},
      {"id": 3, "title": 'def', "company" :'yyz'}];
  }

}

