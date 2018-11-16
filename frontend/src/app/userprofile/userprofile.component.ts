import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {UserService} from '../shared/service/user.service';
import {Observable} from 'rxjs';
import {User} from '../shared/models/user';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  user:User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService:UserService
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {

    const id = localStorage.getItem('userId');
    this.userService.getUser(id).subscribe( result => {
      this.user = result;
    })
  }

}
