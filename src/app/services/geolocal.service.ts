import { Injectable } from '@angular/core';
import {Geolocation, Geoposition} from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class GeolocalService {

  constructor(private geolocation: Geolocation) { }

  getLocalisation(): Promise<Geoposition> {
    return this.geolocation.getCurrentPosition();
  }
}
