import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 // language switcher based on: https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-angular6-app-with-ngx-translate

  languages: string[] = ['en', 'de', 'fr'];

  constructor(
    public auth:AuthService,
    private translate:TranslateService)
    {
      translate.setDefaultLang('en');
    }

  ngOnInit() {
  }

  useLanguage(language: string) {
    this.translate.use(language)
  }

  logout() {
    this.auth.logout()
  }


}
