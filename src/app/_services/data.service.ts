import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { environment } from '../../environments/environment';

@Injectable()
export class DataService {

  constructor(private httpClient: HttpClient) { }

  postWebsite(website: string): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/v1/webshop/check`, {url: website});
  }

  getTotal(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/v1/data/total`);
  }
}
