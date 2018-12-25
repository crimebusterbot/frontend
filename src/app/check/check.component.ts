import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss']
})
export class CheckComponent implements OnInit {
  public error = false;
  public results: any;
  public loading = false;
  public currentMessage: number;
  private interval;

  public message = [
    'Scanning vertices',
    'Verifying target with FBI',
    'Filling out forms',
    'Knocking on foreign looking doors',
    'Enhancing photos',
    'Grabbing creditcard',
    'Sending server disks to the lab',
    'Scrolling server mouse',
    'Printing SSL certificate',
    'Scanning website for unicorns',
    'Buying fake sunglasses',
    'Getting DNA test for that H1',
    'Chasing a guy with a laptop',
    'Automating data synthification',
    'Polishing imaginary police badge',
    'Interrogating pixels',
    'Browsing the dark web',
    'Downloading donuts'
  ];

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {}

  checkWebsite(url: string) {
    this.error = false;
    this.results = null;
    this.loading = true;
    this.showMessages();

    this.dataService.postWebsite(url).subscribe(
      data => {
        this.loading = false;
        this.stopMessages();
        this.results = data;
      },
      error => {
        this.loading = false;
        this.stopMessages();
        this.error = true;
      }
    );
  }

  stopMessages() {
    clearInterval(this.interval);
  }

  showMessages() {
    this.currentMessage = this.pickRandomMessage();

    this.interval = setInterval(() => {
      this.currentMessage = this.pickRandomMessage();
    }, 2000);
  }

  pickRandomMessage() {
    return Math.floor(Math.random() * (this.message.length));
  }
}
