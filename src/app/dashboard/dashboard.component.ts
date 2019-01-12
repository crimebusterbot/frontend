import {Component, OnInit} from '@angular/core';
import {DataService} from '../_services/data.service';
import Chart from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public total: number;
  public good: number;
  public fake: number;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getTotal().subscribe(
      data => {
        this.total = data.total;
        this.good = data.good;
        this.fake = data.fake;
      },
      error => {
        console.log(error);
      }
    );

    this.dataService.getTotalOverTime().subscribe(
      data => {
        const labels = data.count.map(count => count.month);
        const dataSetTemp = data.count.map(count => count.amount);
        const dataSet = dataSetTemp.reduce((a, x, i) => [...a, x + (a[i - 1] || 0)], []);

        const ctx = document.getElementById('totalOverTime');

        const chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Websites over time',
              data: dataSet
            }]
          },

          options: {
            responsive: true,
            elements: {
              line: {
                tension: 0
              }
            }
          }
        });
      },
      error => {
        console.log(error);
      }
    );
  }
}
