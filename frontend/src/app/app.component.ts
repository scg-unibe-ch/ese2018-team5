import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { AuthService} from './auth.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
    private translate:TranslateService)
  {
    translate.setDefaultLang('en');
  }

 ngOnInit(){}



  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}



