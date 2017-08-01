import {Component, OnInit} from '@angular/core';
import {DataService} from '../_services/data.service';
import {MapsAPILoader} from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  lat = 33.81187;
  long = -117.91867;
  latlngBounds;
  zoom = 20;
  trashcans: any;
  bounds: any;

  constructor(private dataService: DataService, private mapsAPILoader: MapsAPILoader) {
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
          console.log(this.trashcans);
        },
        error => {
          console.log(error);
        }
      );
  }

  // Geeft een CSS kleur terug op basis van het vullings percentage
  calculateStatus(percentage) {
    if (percentage < 40) {
      return 'green';
    } else if (percentage > 40 && percentage < 80) {
      return 'orange';
    } else {
      return 'red';
    }
  }
}
