import { Component, OnInit } from '@angular/core';
import {User} from '../shared/models/user';
import {UserService} from '../shared/service/user.service';
import {AlertService} from '../shared/service/alert.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  users: User[] = [];
  selectedUser: User;
  constructor(private userService: UserService, private alertService:AlertService) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.userService.getUsers().subscribe(result => {
      this.users = result as User[];
    })
  }

  onSelect(user:User):void {
    this.selectedUser = user;
  }

  editUserPW(user:User) {
    this.userService.patchUserPassword(user, user.password).subscribe(
      data => {
        this.alertService.success('User edited', false);
      },
      error => {
        this.alertService.error('Could not edit user', false);
      }
    );
    this.selectedUser = null;
    this.fetchData();
  }

  changePW() {
    //TODO: ADD changepassword component here
  }

  editUser(user:User) {
    console.log(user);
    this.userService.patchUserWithOutPW(user).subscribe(
      data => {
        this.alertService.success('User edited', false);
      },
      error => {
        this.alertService.error('Could not edit user', false);
      }
    );
    this.selectedUser = null;
    this.fetchData();
  }

 //TODO: password
  deleteUser(user:User) {
    this.userService.deleteUser(user).subscribe(() =>

      data => {
        this.alertService.success('User deleted', true);
        this.fetchData();
      },
      error => {
        this.alertService.error('Could not delete user', true);
        this.fetchData();
      }
    );

    this.selectedUser = null;
  }

}
