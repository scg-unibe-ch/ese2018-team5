import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../shared/models/user';
import {UserService} from '../shared/service/user.service';
import {AlertService} from '../shared/service/alert.service';
import {AuthService} from '../auth.service';
import {MatTableDataSource, MatSort} from '@angular/material';
import {FilterPipe} from 'ngx-filter-pipe';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  users: User[] = [];
  selectedUser: User;
  changePassword = false;
  displayedColumns = ['id','username','email','role','language','actions'];
  dataSource;
  @ViewChild(MatSort) sort: MatSort;

  userFilter: any = {
    id: '',
    username: '',
    email: '',
    role: '',
    language:''
  };

  constructor(private userService: UserService, private alertService:AlertService, private auth:AuthService, private filterPipe: FilterPipe) { }

  ngOnInit() {
    this.fetchData();
  }

  createTable() {
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.sort = this.sort;
  }

  refresh() {
    this.dataSource.data = this.users;
  }

  fetchData() {
    this.userService.getUsers(this.auth.getId()).subscribe(result => {
      this.users = result as User[];
      this.createTable()
    })
  }

  onSelect(user:User):void {
    this.selectedUser = user;
  }

  swapPW(p) {
    this.changePassword = p;
  }

  editUser(user:User) {
    this.userService.patchUserWithOutPW(user).subscribe(
      data => {
        this.alertService.success('User edited', false);
        this.fetchData();
      },
      error => {
        this.alertService.error('Could not edit user', false);
      }
    );

    this.selectedUser = null;
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
    this.refresh();
  }

  applyFilter() {
    this.dataSource.data = this.filterPipe.transform(this.users, this.userFilter);
  }
}

