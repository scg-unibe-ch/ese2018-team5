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
    if(localStorage.getItem('lang') !== null) {
      console.log('lang');
      this.translate.use(localStorage.getItem('lang'));
    } else {
      this.translate.use('en');
    }

    if(!this.auth.isAuthenticated()) {
      this.auth.logout();
    }
  }


  useLanguage(language: string) {
    this.translate.use(language)
  }

  getId() {
    if(localStorage.getItem('id') !== null) {
      return localStorage.getItem('id');
    }
  }

  logout() {
    this.translate.use('en');
    this.auth.logout()
  }
}
