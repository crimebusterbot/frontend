import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.scss']
})
export class TopmenuComponent implements OnInit {

  opened = false;

  constructor() { }

  ngOnInit() {
  }

  openNavigation() {
    this.opened = true;
  }

  closeNavigation() {
    this.opened = false;
  }

}
