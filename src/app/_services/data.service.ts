import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Http} from '@angular/http';

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  getTrashcans() {
    // const url = 'https://private-dd1e58-smarttrashcan.apiary-mock.com/trashcans';
     const url = 'https://smarttrash.herokuapp.com/trashcans';

     return this.http.get(url)
       .map(res => res.json());
  }

  getTrashcansRoute() {
    // const url = 'https://private-dd1e58-smarttrashcan.apiary-mock.com/trashcans/getroute';
    const url = 'https://smarttrash.herokuapp.com/trashcans/getroute';

    return this.http.get(url)
      .map(res => res.json());
  }

  getTrashcan(id) {
    const url = 'https://private-dd1e58-smarttrashcan.apiary-mock.com/trashcans';

    return this.http.get(url + '/' + id)
      .map(res => res.json());
  }

  getTrashOverTime(id) {
    const url = 'https://smarttrash.herokuapp.com/analytics/filledUp';

    return this.http.get(url + '/' + id)
      .map(res => res.json());
  }

  getTotalTrashOverTime() {
    const url = 'https://smarttrash.herokuapp.com/analytics/totalFilledUp';

    return this.http.get(url)
      .map(res => res.json());
  }

  getHumidityOverTime(id) {
    const url = 'https://smarttrash.herokuapp.com/analytics/humidity';

    return this.http.get(url + '/' + id)
      .map(res => res.json());
  }

  getMassOverTime(id) {
    const url = 'https://smarttrash.herokuapp.com/analytics/mass';

    return this.http.get(url + '/' + id)
      .map(res => res.json());
  }
}
