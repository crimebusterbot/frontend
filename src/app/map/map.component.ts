import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../_services/data.service';
import {ReadableTimePipe} from '../_pipes/readable-time.pipe';
import {MapsAPILoader, InfoWindowManager, GoogleMapsAPIWrapper, MarkerManager} from '@agm/core';

import {Trashcan} from '../_interfaces/trashcan.model';
import {LogService} from '../_services/log.service';
import {Subscription} from 'rxjs/Rx';
import {Area} from '../_interfaces/area.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [InfoWindowManager, GoogleMapsAPIWrapper, MarkerManager]
})

export class MapComponent implements OnInit, OnDestroy {
  loading: boolean;
  latlngBounds; // Object waarmee het centrum van het scherm berekend wordt.
  zoom = 20; // Zoom niveau voor de kaart.
  trashcans: Trashcan[] = [];
  sub: Subscription;
  dataSub: Subscription;

  fillColor = 'red';
  fillOpacity = 0.2;
  strokeColor = 'red';
  strokeOpacity = 0.3;

  areaData: Area[];

  constructor(private dataService: DataService,
              private mapsAPILoader: MapsAPILoader,
              private logService: LogService) {
  }

  ngOnInit() {
    this.loading = true;

    this.sub = this.dataService.getTrashcans()
      .subscribe(
        (trashcans: Trashcan[]) => {
          this.trashcans = trashcans;

          // We laden een object dat het centrum van de verschillende prullenbakken berekend.
          this.mapsAPILoader.load().then(() => {
            this.latlngBounds = new window['google'].maps.LatLngBounds();
            this.trashcans.forEach((location) => {
              this.latlngBounds.extend(new window['google'].maps.LatLng(location.lat, location.long));
            });
          });
        },
        error => {
          this.logService.log(error);
        }
      );

    // We halen de coordinaten van de areas op
    this.dataSub = this.dataService.getTrashcanAreas()
      .subscribe(
        (areaData: Area[]) => {
          this.areaData = areaData;

          this.loading = false;
        }
      );
  }

  // Geeft een CSS kleur terug op basis van het vullings percentage
  calculateStatus(percentage: number) {
    if (percentage < 40) {
      return './../assets/images/green-trashcan.png';
    } else if (percentage > 40 && percentage < 70) {
      return './../assets/images/orange-trashcan.png';
    } else {
      return './../assets/images/red-trashcan.png';
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.dataSub.unsubscribe();
  }
}
