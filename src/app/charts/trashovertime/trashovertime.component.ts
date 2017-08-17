import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../_services/data.service';
import {DatePipe} from '@angular/common';
import {LogService} from '../../_services/log.service';
import {RangeService} from '../../_services/range.service';

@Component({
  selector: 'app-trashovertime',
  templateUrl: './trashovertime.component.html',
  styleUrls: ['./trashovertime.component.scss'],
  providers: [DatePipe]
})
export class TrashOverTimeComponent implements OnInit, OnDestroy {
  loading: boolean;
  sub: any;
  active: string;

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

  constructor(private dataService: DataService,
              private datePipe: DatePipe,
              private logService: LogService,
              private rangeService: RangeService) {
  }

  ngOnInit() {
    this.loading = true;

    this.active = 'today';

    this.begin = this.rangeService.calculateBegin('today');
    this.end = this.rangeService.calculateEnd();

    this.sub = this.dataService.getTotalTrashOverTime(this.begin, this.end)
      .subscribe(
        graphData => {
          this.graphData = graphData;
          this.loading = false;

          this.graphData.forEach((dataPoint) => {
            this.lineChartData[0].data.push(dataPoint.total_volume);
            this.lineChartLabels.push(this.datePipe.transform(dataPoint.time, 'dd-MM H:mm'));
          });
        },
        error => {
          this.logService.log(error);
        }
      );
  }

  setRange(timePeriod) {

    this.lineChartData[0].data = [];
    this.lineChartLabels = [];

    this.active = timePeriod;

    this.begin = this.rangeService.calculateBegin(timePeriod);

    this.loading = true;
    this.sub = this.dataService.getTotalTrashOverTime(this.begin, this.end)
      .subscribe(
        graphData => {
          this.graphData = graphData;
          this.loading = false;

          this.graphData.forEach((dataPoint) => {
            this.lineChartData[0].data.push(dataPoint.total_volume);
            this.lineChartLabels.push(this.datePipe.transform(dataPoint.time, 'dd-MM H:mm'));
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
