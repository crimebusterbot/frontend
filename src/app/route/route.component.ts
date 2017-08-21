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

          // Voor elke area moeten we een aparte route ophalen
          if (this.areas) {
            this.areas.forEach((area, index) => {

              // Use the function to process routes
              this.processRoutes(area.id, index);
            });
          } else {
            console.log('Areas are missing');
          }

          this.processTrashcans();
        },
        error => {
          console.log(error);
        }
      );
  }

  processRoutes(areaId, index) {
    this.dataService.getTrashcansRoute(areaId)
      .subscribe(
        trashcansOnRoute => {
          const routeIndex = index;

          this.routes.push([]);
          console.log(this.routes);

          // Het begin en eindpunt van de route bepalen
          this.routes[routeIndex].origin = {
            latitude: trashcansOnRoute.route[0].latt,
            longitude: trashcansOnRoute.route[0].long
          };

          this.routes[routeIndex].destination = {
            latitude: trashcansOnRoute.route[trashcansOnRoute.route.length - 1].latt,
            longitude: trashcansOnRoute.route[trashcansOnRoute.route.length - 1].long
          };

          this.routes[routeIndex].waypoints = [];

          // We maken een object aan dat de informatie over de waypoints (de tussenliggende punten) bevat
          trashcansOnRoute.route.forEach((trashcan, index) => {
            // De eerste en laatste kunnen geen waypoints zijn.
            if (index !== 0 && index !== trashcansOnRoute.route.length - 1) {
              this.routes[routeIndex].waypoints.push({
                location: trashcan.latt + ',' + trashcan.long,
                stopover: true
              });
            }
          });
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
