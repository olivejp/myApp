import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocalService {

  constructor(private geolocation: Geolocation) { }

  getLocalisation(): Observable {
    Observable.fromPromise(this.geolocation)
  }
}
