import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from '../auth.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 // language switcher based on: https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-angular6-app-with-ngx-translate

  languages: string[] = ['EN  |', 'DE  |', 'FR'];

  @Input()
  id:string;

  constructor(
    public auth:AuthService,
    public translate:TranslateService)
    {
      translate.setDefaultLang('en');
    }

  ngOnInit() {
    this.id = this.getId();
  }


  useLanguage(language: string) {
    this.translate.use(language)
  }

  getId() {
    if(this.id == null || this.id != localStorage.getItem('userId')) {
      this.id = localStorage.getItem('userId')
    }
    return this.id;
  }

  logout() {
    this.auth.logout()
  }
}
