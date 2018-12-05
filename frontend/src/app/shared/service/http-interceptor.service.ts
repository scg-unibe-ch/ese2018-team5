import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../auth.service';
import {HttpEvent, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(
    private router:Router,
    private auth:AuthService
  ) { }

  header = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ this.auth.getToken()
  });

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('intercepted req..');

    const authReq = req.clone({headers: req.headers.set('Authorization','Bearer ' + this.auth.getToken())});

    console.log('sending req with new headers');

    return next.handle(authReq)
      .pipe(
        tap(event => {
          if(event instanceof HttpResponse) {
            console.log(event.status);
          }
        }, error => {
          console.log(error.status);
        })
      )
  }

}
