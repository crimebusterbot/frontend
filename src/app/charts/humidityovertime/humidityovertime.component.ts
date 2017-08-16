import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../_services/data.service';
import {DatePipe} from '@angular/common';
import {LogService} from '../../_services/log.service';

@Component({
  selector: 'app-humidityovertime',
  templateUrl: './humidityovertime.component.html',
  styleUrls: ['./humidityovertime.component.scss'],
  providers: [DatePipe]
})
export class HumidityOverTimeComponent implements OnInit, OnDestroy {
  loading: boolean;
  sub: any;

  public graphData: any;
  public lineChartData: Array<any> = [
    {
      data: [],
      label: 'Average Humidity in trashcans over time'
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

  constructor(private dataService: DataService, private datePipe: DatePipe, private logService: LogService) { }

  ngOnInit() {
    this.loading = true;
    this.sub = this.dataService.getTotalHumidityOverTime()
      .subscribe(
        graphData => {
          this.graphData = graphData;
          this.loading = false;

          this.graphData.forEach((dataPoint) => {
            this.lineChartData[0].data.push(dataPoint.total_humidity);
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
