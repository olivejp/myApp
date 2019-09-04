import { Injectable } from '@angular/core';
import {Geolocation, Geoposition} from '@ionic-native/geolocation/ngx';
import { Observable, interval, from } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeolocalService {

  constructor(private geolocation: Geolocation) { }

  getLocalisation(): Observable<Geoposition> {
    return interval(3000).pipe(flatMap(() => from(this.geolocation.getCurrentPosition()))) ;
  }
}
