import { Directive, OnInit, Input, OnChanges} from '@angular/core';
import { AgmCoreModule, GoogleMapsAPIWrapper, MapsAPILoader} from '@agm/core';

declare let google: any;

@Directive({
  selector: 'agm-heatmap'
})

export class AgmHeatmapDirective implements OnInit, OnChanges {

  constructor(private googleMapsAPIWrapper: GoogleMapsAPIWrapper,
              private mapsAPIloader: MapsAPILoader) { }

  heatmap: any;
  @Input() heatmapPoints: any[] = [];

  ngOnInit() {
    this.googleMapsAPIWrapper.getNativeMap().then((map) => {
      this.mapsAPIloader.load().then(() => {
        const googlepoints = [];

        this.heatmapPoints.forEach(point => {
          if (point.weight){
            googlepoints.push({location: new google.maps.LatLng(parseFloat(point.latitude), parseFloat(point.longitude)), weight: point.weight});
          } else {
            googlepoints.push({location: new google.maps.LatLng(parseFloat(point.latitude), parseFloat(point.longitude)) });
          }
        });

        this.heatmap = new google.maps.visualization.HeatmapLayer({
          data: googlepoints,
          map: map
        });
      });
    }, err => {
      console.log('error', err);
    });
  }

  ngOnChanges() {
    if (this.heatmap && this.heatmapPoints && this.heatmapPoints.length > 0) {
      const googlepoints = [];

      this.heatmapPoints.forEach(x => {
        googlepoints.push(new google.maps.LatLng(parseFloat(x.latitude), parseFloat(x.longitude)));
      });

      this.heatmap.data = googlepoints;
    }
  }
}
