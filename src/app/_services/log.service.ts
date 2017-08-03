import {environment } from '../../environments/environment';
import {Injectable} from '@angular/core';

@Injectable()

export class LogService {
  constructor() { }

  public log(input: any, object?: any) {
    if (!environment.production) {
      console.log(input, object);
    }
  }
}
