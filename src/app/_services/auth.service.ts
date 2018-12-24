import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {CanActivateChild, Router} from '@angular/router';

@Injectable()
export class AuthenticationService implements CanActivateChild {
  constructor(private http: HttpClient, private router: Router) { }

  canActivateChild() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && currentUser.token && currentUser.username) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  login(username: string, password: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'api-key': 'Ren!Y31O@m*3xc6^EujgC65&'
      })
    };

    //noinspection TypeScriptUnresolvedFunction
    return this.http.post('https://central-api.api.webshop-checker.nl/v1/user/auth', JSON.stringify({ username: username, password: password }), options)
      .map((response: any) => {
        // login successful if there's a jwt token in the response

        if (response && response.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(response));
        }
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
