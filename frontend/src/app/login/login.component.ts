import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import {AlertService} from '../shared/service/alert.service';
import {User} from '../shared/models/user';
import {UserService} from '../shared/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;
  public error: string;

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService
  ) { }

  public submit() {
    this.auth.login(this.username, this.password)
      .pipe(first())
      .subscribe(
        result => this.router.navigate(['/dashboard']),
        err => {
          this.alertService.error('Could not authenticate');
        }
      );
  }

  ngOnInit(): void {
    const user = new User(null,'admin1','admin1','admin', 4)
    this.userService.createUser(user).subscribe();
  }
}
