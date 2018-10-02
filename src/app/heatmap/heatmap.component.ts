import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../_services/data.service';
import {MapsAPILoader, InfoWindowManager, GoogleMapsAPIWrapper} from '@agm/core';
import {LogService} from '../_services/log.service';
import {Subscription} from 'rxjs/Rx';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss'],
  providers: [InfoWindowManager, GoogleMapsAPIWrapper]
})

export class HeatmapComponent implements OnInit, OnDestroy {

  latlngBounds;
  loading = false;
  heatmapPoints: any = [];
  sub: Subscription;
  zoom = 20;

  constructor(private dataService: DataService,
              private mapsAPILoader: MapsAPILoader,
              private logService: LogService) {
  }

  ngOnInit() {
    this.loading = true;

    this.sub = this.dataService.getTimesEmptied()
      .subscribe(
        (heatmapData: any) => {
          heatmapData.forEach((trashcan) => {
            this.heatmapPoints.push({latitude: trashcan.latt, longitude: trashcan.long, weight: trashcan.timesEmptied});
          });

          // We laden een object dat het centrum van de verschillende punten berekend.
          this.mapsAPILoader.load().then(() => {
            this.latlngBounds = new window['google'].maps.LatLngBounds();
            heatmapData.forEach((location) => {
              this.latlngBounds.extend(new window['google'].maps.LatLng(location.latt, location.long));
            });
          });

          this.loading = false;
        }
      );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
