import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {User} from '../shared/models/user';
import {JobItemDataService} from '../jobpostingedit/job-item-data.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  @Input() user: User;

  selectedUser: User;

  constructor(
    private dataService: JobItemDataService
  ) {
    this.user = undefined;
  }

  ngOnInit() {
    this.selectedUser = this.user;
  }



}
