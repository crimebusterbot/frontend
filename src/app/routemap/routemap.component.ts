import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-routemap',
  templateUrl: './routemap.component.html',
  styleUrls: ['./routemap.component.scss']
})
export class RoutemapComponent implements OnInit {

  @Input() info:any;
  googleAPIKey: string;


  constructor() { }

  ngOnInit() {

    this.googleAPIKey = "AIzaSyBQewtxu9Ba2IvG5wytQLF185jE7QkgLKU";
  }

}
