import {Injectable} from '@angular/core';

import {HttpClient } from '@angular/common/http';
import {forkJoin} from 'rxjs';

@Injectable()
export class DataService {

  constructor(private httpClient: HttpClient) {
  }

  getTrashcans() {
    // const url = 'https://private-dd1e58-smarttrashcan.apiary-mock.com/trashcans';
    const url = 'https://smarttrash.herokuapp.com/trashcans';

    return this.httpClient.get(url);
  }

  // Stuur een array met ids van areas mee.
  getTrashcansRoute(idObject) {
    const url = 'https://smarttrash.herokuapp.com/trashcans/getroute';

    // We slaan tijdelijk een array met daarin observables op.
    const observableBatch = [];

    // We pushen nieuwe observables om ze te kunnen combineren later.
    idObject.forEach(( id ) => {
      observableBatch.push( this.httpClient.get(url + '/' + id));
    });

    // Gebruik een forkjoin om meerdere calls te combineren
    return forkJoin(observableBatch);
  }

  getTrashcan(id) {
    const url = 'https://private-dd1e58-smarttrashcan.apiary-mock.com/trashcans';

    return this.httpClient.get(url + '/' + id);
  }

  getTrashOverTime(id) {
    const url = 'https://smarttrash.herokuapp.com/analytics/filledUp';

    return this.httpClient.get(url + '/' + id);
  }

  getTotalTrashOverTime(begin, end) {
    const url = 'https://smarttrash.herokuapp.com/analytics/totalFilledUp';

    if (begin && end) {
      return this.httpClient.get(url + '?begin=' + begin + '&end=' + end);
    }
  }

  getTotalHumidityOverTime(begin, end) {
    const url = 'https://smarttrash.herokuapp.com/analytics/totalHumidity';

    if (begin && end) {
      return this.httpClient.get(url + '?begin=' + begin + '&end=' + end);
    }
  }

  getHumidityOverTime(id) {
    const url = 'https://smarttrash.herokuapp.com/analytics/humidity';

    return this.httpClient.get(url + '/' + id);
  }

  getMassOverTime(id) {
    const url = 'https://smarttrash.herokuapp.com/analytics/mass';

    return this.httpClient.get(url + '/' + id);
  }

  getTrashcanAreas() {
    const url = 'https://smarttrash.herokuapp.com/trashcans/area';

    return this.httpClient.get(url);
  }

  getTimesEmptied() {
    const url = 'https://smarttrash.herokuapp.com/analytics/timesemptied';

    return this.httpClient.get(url);
  }
}
