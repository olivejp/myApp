import { Component, OnInit } from '@angular/core';
import { GeolocalService } from '../services/geolocal.service';
import { Geoposition } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-geolocalisation',
  templateUrl: './geolocalisation.page.html',
  styleUrls: ['./geolocalisation.page.scss'],
})
export class GeolocalisationPage implements OnInit {

  private position: Geoposition;

  constructor(private geolocation: GeolocalService) { }

  ngOnInit() {
    this.geolocation.getLocalisation()
    .then(position => {
      this.position = position;
      console.log(position);
    })
    .catch(error =>  console.error(error));
  }
}
