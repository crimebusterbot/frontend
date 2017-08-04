import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../_services/data.service';
import {DatePipe} from '@angular/common';
import {LogService} from '../../_services/log.service';

@Component({
  selector: 'app-massovertime-single',
  templateUrl: './massovertime-single.component.html',
  styleUrls: ['./massovertime-single.component.scss'],
  providers: [DatePipe]
})
export class MassOverTimeSingleComponent implements OnInit, OnDestroy {
  @Input() id: number;
  loading: boolean;
  sub: any;

  public graphData: any;
  public lineChartData: Array<any> = [
    {
      data: [],
      label: 'Mass over time'
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
    this.sub = this.dataService.getMassOverTime(this.id)
      .subscribe(
        graphData => {
          this.graphData = graphData;
          this.logService.log(this.graphData);
          this.loading = false;

          this.graphData.forEach((dataPoint) => {
            this.lineChartData[0].data.push(dataPoint.mass);
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
