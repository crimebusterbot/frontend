import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { AuthenticationService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {Router} from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthenticationService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Only if there is a token to be added.
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          'x-access-token': currentUser.token,
          'api-key': 'Ren!Y31O@m*3xc6^EujgC65&'
        }
      });
    }

    return next.handle(request).do((event: HttpEvent<any>) => {}, (error: any) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 403) {
          // redirect to the login route
          this.router.navigate(['/login']);
        }
      }
    });
  }
}
