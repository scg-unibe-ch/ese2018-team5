import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../shared/models/user';
import {UserService} from '../shared/service/user.service';
import {AlertService} from '../shared/service/alert.service';
import {AuthService} from '../auth.service';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import {FilterPipe} from 'ngx-filter-pipe';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  users: User[] = [];
  editUser = false;
  selectedUser: User;
  changePassword = false;
  displayedColumns = ['id','username','email','role','language','actions'];


  dataSource;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  userFilter: any = {
    id: '',
    username: '',
    email: '',
    role: '',
    language:''
  };

  languages = ['en','de','fr'];
  roles: number[] = [2,4];

  constructor(
    private userService: UserService,
    private alertService:AlertService,
    private auth:AuthService,
    private filterPipe: FilterPipe
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  createTable() {
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  fetchData() {
    this.userService.getUsers(this.auth.getId()).subscribe(result => {
      this.users = result as User[];
      this.createTable()
    })
  }

  refreshData() {
    this.userService.getUsers(this.auth.getId()).subscribe( data => {
      this.users = data as User[];
      this.dataSource.data = this.users;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.applyFilter();
    })
  }

  changePassw(user:User) {
    this.editUser = false;
    this.changePassword = true;
    this.selectedUser = user;
  }

  swapPW(p) {
    this.changePassword = p;
    this.selectedUser = null;
    this.editUser = false;
  }

  eUser(user:User) {
    this.changePassword = false;
    this.editUser = true;
    this.selectedUser = user;
  }

  editUsers(user:User) {

    this.userService.patchUserWithOutPW(user).subscribe(
      data => {
        this.alertService.success('User edited', false);
        this.refreshData();
      },
      error => {
        this.alertService.error('Could not edit user', false);
        this.refreshData();
      }
    );
    this.editUser = false;
    this.selectedUser = null;
  }

 //TODO: password
  deleteUser(user:User) {
    if(user.role === 4) {
      this.alertService.error('Cannot delete other Administrators', false);
    } else {
      this.userService.deleteUser(user).subscribe(
        data=> {
          this.alertService.success('User deleted', false);
          this.refreshData();
        },
        error => {
          this.alertService.error('Could not delete user', false);
          this.refreshData();
        }
      );
    }
  }

  cancel() {
    this.changePassword = false;
  }

  applyFilter() {
    this.dataSource.data = this.filterPipe.transform(this.users, this.userFilter);
  }

}

