import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  title = 'Do you need a job?';



  constructor(public auth:AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.auth.logout()
  }


}
