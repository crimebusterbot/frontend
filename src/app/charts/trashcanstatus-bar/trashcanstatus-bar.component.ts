import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../_services/data.service';
import {DatePipe} from '@angular/common';
import {LogService} from '../../_services/log.service';

@Component({
  selector: 'app-trashcanstatus-bar',
  templateUrl: './trashcanstatus-bar.component.html',
  styleUrls: ['./trashcanstatus-bar.component.scss'],
  providers: [DatePipe]
})
export class TrashcanStatusBarComponent implements OnInit, OnDestroy {
  @Input() id: number;
  loading: boolean;
  sub: any;

  public graphData: any;
  public graphDataFull: any;

  public lineChartData: Array<any> = [
    {
      data: [],
      label: 'Current trash per trashcan',
      scales: {
        yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Trashcan ID'
            }
        }] ,
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Percentage filled'
          }
        }]
      }
    }
  ];

  public lineChartLabels: Array<any> = [];

  public lineChartType = 'bar';
  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(private dataService: DataService, private datePipe: DatePipe, private logService: LogService) { }

  ngOnInit() {
    this.loading = true;
    this.sub = this.dataService.getTrashcans()
      .subscribe(
        graphData => {
          this.graphData = graphData;
          this.loading = false;

          this.graphData.forEach((dataPoint) => {
            this.lineChartData[0].data.push(dataPoint.filled_up);
            this.lineChartLabels.push(dataPoint.id);
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
