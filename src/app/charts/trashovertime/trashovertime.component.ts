import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../_services/data.service';
import {DatePipe} from '@angular/common';
import {LogService} from '../../_services/log.service';

@Component({
  selector: 'app-trashovertime',
  templateUrl: './trashovertime.component.html',
  styleUrls: ['./trashovertime.component.scss'],
  providers: [DatePipe]
})
export class TrashOverTimeComponent implements OnInit, OnDestroy {
  loading: boolean;
  sub: any;
  today: boolean;
  week: boolean;
  fourWeeks: boolean;

  begin: any;
  end: any;

  public graphData: any;
  public lineChartData: Array<any> = [
    {
      data: [],
      label: 'Average Volume of trash over time'
    }
  ];

  public lineChartLabels: Array<any> = [];

  public lineChartType = 'line';
  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  constructor(private dataService: DataService, private datePipe: DatePipe, private logService: LogService) {
  }

  ngOnInit() {
    this.loading = true;

    this.today = true;

    const dateOffset = 24 * 60 * 60 * 1000;
    const moment = new Date();
    moment.setTime(moment.getTime() - dateOffset); // Bereken nieuwe begin tijd

    this.begin = this.datePipe.transform(moment, 'yyyy-MM-dd hh:mm:ss');
    this.end = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss');

    this.sub = this.dataService.getTotalTrashOverTime(this.begin, this.end)
      .subscribe(
        graphData => {
          this.graphData = graphData;
          this.loading = false;

          this.graphData.forEach((dataPoint) => {
            this.lineChartData[0].data.push(dataPoint.total_volume);
            this.lineChartLabels.push(this.datePipe.transform(dataPoint.time, 'H:mm'));
          });
        },
        error => {
          this.logService.log(error);
        }
      );
  }

  setRange(timePeriod) {


    if (timePeriod === 'today') {
      this.today = true;

      const dateOffset = 24 * 60 * 60 * 1000;
      const moment = new Date();
      moment.setTime(moment.getTime() - dateOffset); // Bereken nieuwe begin tijd

      this.begin = this.datePipe.transform(moment, 'yyyy-MM-dd hh:mm:ss');
      this.end = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss');

    } else if (timePeriod === 'week') {
      this.week = true;

      const dateOffset = (24 * 60 * 60 * 1000) * 7;
      const moment = new Date();
      moment.setTime(moment.getTime() - dateOffset);
      this.begin = this.datePipe.transform(moment, 'yyyy-MM-dd hh:mm:ss');
      this.end = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss');

    } else if (timePeriod === '4weeks') {
      this.fourWeeks = true;

      const dateOffset = (24 * 60 * 60 * 1000) * 28;
      const moment = new Date();
      moment.setTime(moment.getTime() - dateOffset);
      this.begin = this.datePipe.transform(moment, 'yyyy-MM-dd hh:mm:ss');
      this.end = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss');
    }

    this.loading = true;
    this.sub = this.dataService.getTotalTrashOverTime(this.begin, this.end)
      .subscribe(
        graphData => {
          this.graphData = graphData;
          this.loading = false;

          this.graphData.forEach((dataPoint) => {
            this.lineChartData[0].data.push(dataPoint.total_volume);
            this.lineChartLabels.push(this.datePipe.transform(dataPoint.time, 'H:mm'));
          });
        },
        error => {
          this.logService.log(error);
        }
      );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
