import {Injectable} from '@angular/core';
import {DatePipe} from '@angular/common';

@Injectable()
export class RangeService {
  constructor(private datePipe: DatePipe) {}

  calculateBegin(timePeriod) {
    if (timePeriod === 'today') {

      const dateOffset = 24 * 60 * 60 * 1000;
      const moment = new Date();
      moment.setTime(moment.getTime() - dateOffset); // Bereken nieuwe begin tijd

      return this.datePipe.transform(moment, 'yyyy-MM-dd hh:mm:ss');

    } else if (timePeriod === 'week') {

      const dateOffset = (24 * 60 * 60 * 1000) * 7;
      const moment = new Date();
      moment.setTime(moment.getTime() - dateOffset);

      return this.datePipe.transform(moment, 'yyyy-MM-dd hh:mm:ss');

    } else if (timePeriod === '4weeks') {
      const dateOffset = (24 * 60 * 60 * 1000) * 28;
      const moment = new Date();
      moment.setTime(moment.getTime() - dateOffset);

      return this.datePipe.transform(moment, 'yyyy-MM-dd hh:mm:ss');
    }
  }

  calculateEnd() {
    return this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss');
  }
}
