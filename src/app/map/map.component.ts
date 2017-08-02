import {Component, OnInit} from '@angular/core';
import {DataService} from '../_services/data.service';
import {MapsAPILoader, InfoWindowManager, GoogleMapsAPIWrapper, MarkerManager} from '@agm/core';

import {Trashcan} from '../_interfaces/trashcan.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [InfoWindowManager, GoogleMapsAPIWrapper, MarkerManager]
})
export class MapComponent implements OnInit {
  latlngBounds; // Object waarmee het centrum van het scherm berekend wordt.
  zoom = 20; // Zoom niveau voor de kaart.
  trashcans: Trashcan[] = [];
  infoWindows = [];

  infoWindowContent = {
    title: ''
  };

  constructor(private dataService: DataService, private mapsAPILoader: MapsAPILoader, private infoWindowManager: InfoWindowManager) {
  }

  ngOnInit() {

    this.dataService.getTrashcans()
      .subscribe(
        trashcans => {
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
          console.log(error);
        }
      );
  }

  // Geeft een CSS kleur terug op basis van het vullings percentage
  calculateStatus(percentage) {
    if (percentage < 40) {
      return './../assets/images/green-trashcan.png';
    } else if (percentage > 40 && percentage < 80) {
      return './../assets/images/orange-trashcan.png';
    } else {
      return './../assets/images/red-trashcan.png';
    }
  }
}
