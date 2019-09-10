import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { GeolocalService } from '../../services/geolocal.service';
import { Geoposition } from '@ionic-native/geolocation/ngx';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-geolocalisation',
  templateUrl: './geolocalisation.page.html',
  styleUrls: ['./geolocalisation.page.scss'],
})
export class GeolocalisationPage implements OnInit, OnDestroy {

  position: Geoposition;
  formatedDate: string;
  obsInterval: Observable<Geoposition>;

  constructor(private geolocation: GeolocalService) { }

  ngOnInit() {
    this.geolocation.getLocalisation().subscribe(position => {
      this.position = position;

      var date = new Date(position.timestamp);
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var seconds = "0" + date.getSeconds();
      this.formatedDate = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    });
  }

  ngOnDestroy() {

  }
}
