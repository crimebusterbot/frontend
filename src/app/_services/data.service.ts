import {Injectable} from '@angular/core';

import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class DataService {

  constructor(private http: Http) {
  }

  getTrashcans() {
    // const url = 'https://private-dd1e58-smarttrashcan.apiary-mock.com/trashcans';
    const url = 'https://smarttrash.herokuapp.com/trashcans';

    return this.http.get(url)
      .map(res => res.json());
  }

  // Stuur een array met ids van areas mee.
  getTrashcansRoute(idObject) {
    const url = 'https://smarttrash.herokuapp.com/trashcans/getroute';

    // We slaan tijdelijk een array met daarin observables op.
    let observableBatch = [];

    // We pushen nieuwe observables om ze te kunnen combineren later.
    idObject.forEach(( id ) => {
      observableBatch.push( this.http.get(url + '/' + id).map(res => res.json()));
    });

    // Gebruik een forkjoin om meerdere calls te combineren
    return Observable.forkJoin(observableBatch);
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

  getTotalTrashOverTime(begin, end) {
    const url = 'https://smarttrash.herokuapp.com/analytics/totalFilledUp';

    if (begin && end) {
      return this.http.get(url + '?begin=' + begin + '&end=' + end)
        .map(res => res.json());
    }
  }

  getTotalHumidityOverTime(begin, end) {
    const url = 'https://smarttrash.herokuapp.com/analytics/totalHumidity';

    if (begin && end) {
      return this.http.get(url + '?begin=' + begin + '&end=' + end)
        .map(res => res.json());
    }
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

  getTrashcanAreas() {
    const url = 'https://smarttrash.herokuapp.com/trashcans/area';

    return this.http.get(url)
      .map(res => res.json());
  }

  getTimesEmptied() {
    const url = 'https://smarttrash.herokuapp.com/analytics/timesemptied';

    return this.http.get(url)
      .map(res => res.json());
  }
}
