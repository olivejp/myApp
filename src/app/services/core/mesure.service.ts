import {Injectable, OnDestroy} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map, share} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MesureService {

    RESOURCE_URL = 'https://sidomobile-c6d38.firebaseio.com/mesures.json';
    mesures;
    observable: Observable<any>;

    constructor(private http: HttpClient) {
    }

    getMesures(): Observable<any> {
        if (this.mesures) {
            return of(this.mesures);
        } else if (this.observable) {
            return this.observable;
        } else {
            this.observable = this.http.get(this.RESOURCE_URL, {observe: 'response'})
                .pipe(
                    map(response => {
                        this.observable = null; // RAZ de l'observable
                        if (response.status === 400) {
                            return 'Request failed.';
                        } else if (response.status === 200) {
                            this.mesures = response.body;
                            return this.mesures;
                        }
                    }),
                    share()
                );
            return this.observable;
        }
    }
}
