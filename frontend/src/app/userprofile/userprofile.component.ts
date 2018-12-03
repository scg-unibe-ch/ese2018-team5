import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {UserService} from '../shared/service/user.service';
import {User} from '../shared/models/user';
import {AuthService} from '../auth.service';
import {AlertService} from '../shared/service/alert.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit   {

  public user: User = new User(null, '','','',null,'');
  changePassword = false;

  languages: string[] = ['en', 'de', 'fr'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService:UserService,
    private auth: AuthService,
    private alertService: AlertService,
    public translate:TranslateService
  ) { }

  ngOnInit() {
    this.translate.use(this.auth.getLanguage());
    this.fetchData();
  }

  fetchData() {
    this.userService.getUser(this.auth.getId()).subscribe( result => this.user = result)
  }

  setLanguage(language:string) {
    this.translate.use(language);
  }

  swapPW(p) {
    this.changePassword = p;
  }

  onSubmit() {
    this.setLanguage(this.user.language);
    this.userService.patchUserWithOutPW(this.user).subscribe();
    this.alertService.success('Profile saved', false);
  }

  onDelete() {
   //TODO: Delete all Jobpostings of user
    this.userService.deleteUser(this.user).subscribe();
    this.alertService.success('Your Profile has been deleted', true);
    this.auth.logout();
  }



}
