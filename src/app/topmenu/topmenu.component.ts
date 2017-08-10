import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.scss']
})
export class TopmenuComponent implements OnInit {

  elementRef: any;
  opened = false;

  constructor(private router: Router) {
  }

  ngOnInit() {

    // Als er een router change is sluit de navigatie
    this.router.events.subscribe((val) => {
      // see also
      this.closeNavigation();
      console.log('Go to ohter route');
    });
  }

  openNavigation() {
    this.opened = true;
  }

  closeNavigation() {
    this.opened = false;
  }

}
