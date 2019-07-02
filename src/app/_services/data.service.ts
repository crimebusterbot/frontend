import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { environment } from '../../environments/environment';

@Injectable()
export class DataService {

  constructor(private httpClient: HttpClient) { }

  postWebsite(website: string): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/v1/webshop/check`, {url: website, queue: true});
  }

  addGoodWebshop(webshop: goodWebshop) {
    return this.httpClient.post(`${environment.apiUrl}/v1/webshop/add`, webshop);
  }

  getTotal(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/v1/data/total`);
  }

  getTotalOverTime(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/v1/data/graph`);
  }

  getAllFakeWebshops(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/v1/data/fake`);
  }
}

interface goodWebshop {
  url: string,
  email?: string,
  vestigingsAdres?: string,
  postAdres?: string,
  telefoonNummer?: string,
  bedrijfsNaam?: string,
  kvkNummer?: string,
  btwNummer?: string,
  contactPersoon?: string,
  keurmerkNaam?: string,
  keurmerkLidSinds?: string,
  categorie?: string,
  naam?: string
}