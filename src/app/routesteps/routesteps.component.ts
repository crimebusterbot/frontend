import { Component, OnInit, OnDestroy } from '@angular/core';
import {DataService} from '../_services/data.service';
import {LogService} from '../_services/log.service';

@Component({
  selector: 'app-routesteps',
  templateUrl: './routesteps.component.html',
  styleUrls: ['./routesteps.component.scss']
})
export class RoutestepsComponent implements OnInit, OnDestroy {

  constructor(private dataService: DataService,
              private logService: LogService) { }

  sub: any;
  trashcans: any;
  card: any;
  googleAPIKey: string;
  coordinates = [];
  alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  showmap = false;
  routeSteps: any;

  ngOnInit() {
    this.googleAPIKey = "AIzaSyBQewtxu9Ba2IvG5wytQLF185jE7QkgLKU";

    this.sub =  this.dataService.getTrashcansRoute([1])
        .subscribe(
        trashcans => {
          this.trashcans = trashcans;

          this.calc();

          console.log("trashcan", this.trashcans[0].route[1].long);
        },
        error => {
          this.logService.log(error);
        }


      );
  }

  calc(){
    for(var i=0; i < this.trashcans[0].route.length-1; i++){

      const centerlong = (this.trashcans[0].route[i].long + this.trashcans[0].route[i+1].long) / 2;
      const centerlatt = (this.trashcans[0].route[i].latt + this.trashcans[0].route[i+1].latt) / 2;

      this.card =
      {
      letter: this.alphabet[i],
      letter2: this.alphabet[i+1],
      centerlat: centerlatt,
      centerlng: centerlong,
      startLng: this.trashcans[0].route[i].long,
      startLat: this.trashcans[0].route[i].latt,
      endLng: this.trashcans[0].route[i+1].long,
      endLat: this.trashcans[0].route[i+1].latt
      };

      this.coordinates.push(this.card);
      console.log("card",this.card);
    };
  }

  select(location){
    this.routeSteps = location;
    this.showmap = true;
    console.log(location);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}
