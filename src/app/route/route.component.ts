import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../_services/data.service';

import {DirectionsMapDirective} from '../_directives/agm-directions.directive';

import {MapsAPILoader, InfoWindowManager, GoogleMapsAPIWrapper, MarkerManager} from '@agm/core';

import {Trashcan} from '../_interfaces/trashcan.model';
import {LogService} from '../_services/log.service';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss'],
  providers: [InfoWindowManager, GoogleMapsAPIWrapper, MarkerManager]
})
export class RouteComponent implements OnInit, OnDestroy {
  loading: boolean;
  latlngBounds; // Object waarmee het centrum van het scherm berekend wordt.
  zoom = 20; // Zoom niveau voor de kaart.
  trashcans: Trashcan[] = [];
  trashcansOnRoute: any;
  sub: any;

  origin: any;
  destination: any;
  waypoints = [];

  constructor(private dataService: DataService,
              private mapsAPILoader: MapsAPILoader,
              private logService: LogService) {
  }

  ngOnInit() {
    this.loading = true;
    this.sub = this.dataService.getTrashcans()
      .subscribe(
        trashcans => {
          this.trashcans = trashcans;

          // We laden een object dat het centrum van de verschillende prullenbakken berekend.
          this.mapsAPILoader.load().then(() => {
            this.latlngBounds = new window['google'].maps.LatLngBounds();
            this.trashcans.forEach((trashcan) => {
              this.latlngBounds.extend(new window['google'].maps.LatLng(trashcan.lat, trashcan.long));
            });
          });

          this.dataService.getTrashcansRoute()
            .subscribe(
              trashcansOnRoute => {
                this.trashcansOnRoute = trashcansOnRoute;

                // Het begin en eindpunt van de route
                this.origin = {latitude: this.trashcansOnRoute.route[0].latt, longitude: this.trashcansOnRoute.route[0].long};
                this.destination = {
                  latitude: this.trashcansOnRoute.route[trashcansOnRoute.route.length - 1].latt,
                  longitude: this.trashcansOnRoute.route[trashcansOnRoute.route.length - 1].long
                };

                // We maken een object aan dat de informatie over de waypoints (de tussenliggende punten) bevat
                this.trashcansOnRoute.route.forEach((trashcan, index) => {
                  if (index !== 0 && index !== this.trashcansOnRoute.route.length - 1) { // De eerste en laatste kunnen geen waypoints zijn.
                    this.waypoints.push({
                      location: trashcan.latt + ',' + trashcan.long,
                      stopover: true
                    });
                  }
                });

                this.loading = false;
              },
              error => {
                this.logService.log(error);
              }
            );
        },
        error => {
          this.logService.log(error);
        }
      );
  }

  // Geeft een CSS kleur terug op basis van het vullings percentage
  calculateStatus(percentage) {
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
  }
}
