import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../shared/models/user';
import {UserService} from '../shared/service/user.service';
import {AlertService} from '../shared/service/alert.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  @Input() user: User;

  @Output() changePW = new EventEmitter();

  passwordChange = true;

  password: string;
  confirmPW: string;

  constructor(
    private userService: UserService,
    private alertService: AlertService

  ){ }

  ngOnInit() {
  }

  onSubmit() {
    if(this.password == this.confirmPW) {
      this.userService.patchUserPassword(this.user, this.password).subscribe();
      this.alertService.success('Password changed', false);
      this.password = null;
      this.confirmPW = null;
      this.passwordChange = false;
      this.changePW.emit(this.passwordChange);

    } else {
      this.alertService.error('Passwords do not match', false)
    }
  }
}

