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
  sub: any;
  areas: any;

  fillColor = 'red';
  fillOpacity = 0.2;
  strokeColor = 'red';
  strokeOpacity = 0.3;

  waypoints = [];
  routes = [];

  constructor(private dataService: DataService,
              private mapsAPILoader: MapsAPILoader,
              private logService: LogService) {
  }

  ngOnInit() {
    this.loading = true;

    this.sub = this.dataService.getTrashcanAreas()
      .subscribe(
        areas => {
          this.areas = areas;
          const allAreaIDs = [];

          // Stuur een object met ids naar de service die ze vervolgens bundeld en ophaald.
          this.areas.forEach((area, index) => {
            allAreaIDs.push(area.id);
          });

          // Gebruik de opgehaalde data om de routes voor te bereiden,
          // we gebruiken een callback om hierna de prullenbakken te laden
          this.processRoutes(allAreaIDs, callback => {
            this.processTrashcans();
          });
        },
        error => {
          console.log(error);
        }
      );
  }

  processRoutes(allAreaIDs, callback) {
    this.dataService.getTrashcansRoute(allAreaIDs)
      .subscribe(
        routeCollection => {
          routeCollection.forEach((routeObject, index) => {
            console.log("routeobject", routeObject);
            this.routes.push([]);
            const routeIndex = index;

            // Het begin en eindpunt van de route bepalen
            this.routes[routeIndex].origin = {
              latitude: routeObject['route'][0].latt,
              longitude: routeObject['route'][0].long
            };

              console.log("origin", this.routes[routeIndex].origin)
            this.routes[routeIndex].destination = {
              latitude: routeObject['route'][routeObject['route'].length - 1].latt,
              longitude: routeObject['route'][routeObject['route'].length - 1].long
            };

            this.routes[routeIndex].waypoints = [];

            // We maken een object aan dat de informatie over de waypoints (de tussenliggende punten) bevat
            routeObject['route'].forEach((trashcan, index) => {
              // De eerste en laatste kunnen geen waypoints zijn.
              if (index !== 0 && index !== routeObject['route'].length - 1) {
                this.routes[routeIndex].waypoints.push({
                  location: trashcan.latt + ',' + trashcan.long,
                  stopover: true
                });
              }
            });
          });

          // Pas als alles klaar is laden we de rest in.
          callback();
        },
        error => {
          this.logService.log(error);
        }
      );
  }

  processTrashcans() {
    // Alle prullenbakken voor op de kaart
    this.dataService.getTrashcans()
      .subscribe(
        trashcans => {
          this.trashcans = trashcans;
          this.loading = false;

          // We laden een object dat het centrum van de verschillende prullenbakken berekend.
          this.mapsAPILoader.load().then(() => {
            this.latlngBounds = new window['google'].maps.LatLngBounds();
            this.trashcans.forEach((trashcan) => {
              this.latlngBounds.extend(new window['google'].maps.LatLng(trashcan.lat, trashcan.long));
            });
          });
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
