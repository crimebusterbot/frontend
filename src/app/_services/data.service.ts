import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';

@Injectable()
export class DataService {

  constructor(private httpClient: HttpClient) { }

  postWebsite(website: string): Observable<any> {
    return this.httpClient.post('https://central-api.api.webshop-checker.nl/v1/webshop/check', {url: website});
  }
}
