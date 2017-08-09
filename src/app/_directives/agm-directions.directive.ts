import {GoogleMapsAPIWrapper} from '@agm/core/services/google-maps-api-wrapper';
import {Directive, Input, OnInit} from '@angular/core';
declare let google: any;


@Directive({
  selector: 'agm-directions'
})
export class DirectionsMapDirective implements OnInit {
  @Input() origin;
  @Input() destination;
  @Input() waypoints;

  constructor(private gmapsApi: GoogleMapsAPIWrapper) {
  }

  ngOnInit() {
   // console.log(this.waypoints);


    this.gmapsApi.getNativeMap().then(map => {
      const directionsService = new google.maps.DirectionsService;
      const directionsDisplay = new google.maps.DirectionsRenderer;
      directionsDisplay.setMap(map);
      directionsService.route({
        origin: {lat: this.origin.latitude, lng: this.origin.longitude},
        destination: {lat: this.destination.latitude, lng: this.destination.longitude},
        waypoints: this.waypoints,
        optimizeWaypoints: true,
        travelMode: 'WALKING'
      }, function (response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    });
  }
}
