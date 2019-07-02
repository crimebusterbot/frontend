import {Component, OnInit} from '@angular/core';
import {DataService} from '../_services/data.service';

@Component({
  selector: 'app-all-fake-webshops',
  templateUrl: './all-fake-webshops.component.html',
  styleUrls: ['./all-fake-webshops.component.scss']
})
export class AllFakeWebshopsComponent implements OnInit {
  result: FakeWebshop[];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAllFakeWebshops().subscribe(
      data => {
        this.result = data.result;
      },
      error => {
        console.log(error);
      }
    );
  }
}

interface FakeWebshop {
  url: string,
  fakeScore: number,
  checked: Date
}