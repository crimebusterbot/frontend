import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-routemap',
  templateUrl: './routemap.component.html',
  styleUrls: ['./routemap.component.scss']
})

export class RoutemapComponent implements OnInit {

  @Input() info: any;
  @Input() zoom: number;
  googleAPIKey: string;

  constructor() { }

  ngOnInit() {
    this.googleAPIKey = 'AIzaSyA0GAxZTfJDYAROt2bAQs58zZ28RO7XpR0';
  }
}
