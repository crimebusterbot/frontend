import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Http} from '@angular/http';

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  getTrashcans() {
     const url = 'https://private-dd1e58-smarttrashcan.apiary-mock.com/trashcans';

     return this.http.get(url)
       .map(res => res.json());
  }
}