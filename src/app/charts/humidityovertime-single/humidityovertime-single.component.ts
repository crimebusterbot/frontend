import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../_services/data.service';
import {DatePipe} from '@angular/common';
import {LogService} from '../../_services/log.service';

@Component({
  selector: 'app-humidityovertime-single',
  templateUrl: './humidityovertime-single.component.html',
  styleUrls: ['./humidityovertime-single.component.scss'],
  providers: [DatePipe]
})
export class HumidityOverTimeSingleComponent implements OnInit, OnDestroy {
  @Input() id: number;
  loading: boolean;
  sub: any;

  public graphData: any;
  public lineChartData: Array<any> = [
    {
      data: [],
      label: 'Humidity over time'
    }
  ];

  public lineChartLabels: Array<any> = [];

  public lineChartType = 'line';
  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(private dataService: DataService, private datePipe: DatePipe, private logService: LogService) { }

  ngOnInit() {
    this.loading = true;
    this.sub = this.dataService.getHumidityOverTime(this.id)
      .subscribe(
        graphData => {
          this.graphData = graphData;
          this.loading = false;

          this.graphData.forEach((dataPoint) => {
            this.lineChartData[0].data.push(dataPoint.filled_up);
            this.lineChartLabels.push(this.datePipe.transform(dataPoint.time, 'H:mm'));
          });
        },
        error => {
          this.logService.log(error);
        }
      );
  }

  ngOnDestroy () {
    this.sub.unsubscribe();
  }
}
