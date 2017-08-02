import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-averagetrash',
  templateUrl: './averagetrash.component.html',
  styleUrls: ['./averagetrash.component.scss']
})
export class AveragetrashComponent implements OnInit {

  public lineChartData: Array<any> = [
    {
      data: [25, 34, 39, 56, 71, 5, 10],
      label: 'Average Trash In Bins'
    }
  ];

  public lineChartLabels: Array<any> = [
    '15:35', '15:40', '15:45', '15:50', '15:55', '16:00', '16:05'
  ];

  public lineChartType = 'line';
  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor() {
  }

  ngOnInit() {
  }

}
