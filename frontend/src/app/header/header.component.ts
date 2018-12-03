import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from '../auth.service';
import {TranslateService} from '@ngx-translate/core';
import {User} from '../shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 // language switcher based on: https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-angular6-app-with-ngx-translate
  //TODO: Button to change set preferred language
  languages: string[] = ['en', 'de', 'fr'];

  id: number;
  user: User;

  constructor(
    public auth:AuthService,
    public translate:TranslateService)
    {
      translate.setDefaultLang('en');
    }

  ngOnInit() {
    this.user = this.auth.getCurrentUser();
    if(this.user == null) {
      this.translate.use('en')
    } else {
      this.useLanguage(this.user.language);
    }
  }


  useLanguage(language: string) {
    this.user.language = language;
    this.auth.setCurrentUser(this.user);
    this.translate.use(language)
  }

  getId() {
    if(this.auth.isAuthenticated && this.user == undefined) {
      this.user = this.auth.getCurrentUser();
    }
    return this.user.id;
  }

  logout() {
    this.translate.use('en');
    this.auth.logout()
  }
}
