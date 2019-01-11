import {Component, OnInit} from '@angular/core';
import {DataService} from '../_services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public total: number;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getTotal().subscribe(
      data => {
        this.total = data.count;
      },
      error => {
        console.log(error);
      }
    );
  }


}
