import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {UserService} from '../shared/service/user.service';
import {User} from '../shared/models/user';
import {AuthService} from '../auth.service';
import {AlertService} from '../shared/service/alert.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  user:User;
  changePassword = false;
  pw: string;
  confirmPW: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService:UserService,
    private auth: AuthService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    if(this.auth.isAuthenticated() || this.user == null) {
      this.getUser();
    }
  }

  getUser() {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id).subscribe( user => {
      this.user = user;
    })
  }

  changePW() {
    if(this.pw == this.confirmPW) {
      this.user.password = this.pw;
      this.userService.updateUser(this.user).subscribe();
      this.alertService.success('Password changed', false);
      this.changePassword = false;
      this.pw = null;
      this.confirmPW = null;
    } else {
      this.alertService.error('Passwords do not match', false)
    }
  }

  onSubmit() {
    this.userService.updateUser(this.user).subscribe();
    this.alertService.success('Profile saved', false);
  }

  onDelete() {
    this.userService.deleteUser(this.user).subscribe();
    this.alertService.success('Your Profile has been deleted', true);
    this.auth.logout();
  }

}
