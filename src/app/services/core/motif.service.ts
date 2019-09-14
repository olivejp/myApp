import {Injectable} from '@angular/core';
import {combineLatest, from, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {flatMap, map, share} from 'rxjs/operators';
import {NetworkService} from './network.service';
import {IndexeddbService} from '../../technical/service/indexeddb.service';

@Injectable({
    providedIn: 'root'
})
export class MotifService {

    RESOURCE_URL = 'https://sidomobile-c6d38.firebaseio.com/motifs.json';
    INDEXED_KEY = 'MOTIFS';

    observable: Observable<any>;

    constructor(
        private storage: IndexeddbService,
        private networdkService: NetworkService,
        private http: HttpClient
    ) {
    }

    getMotifs(): Observable<any> {
        const isConnected$ = this.networdkService.isConnected();
        const dataStored$ = from(this.storage.getLocalData(this.INDEXED_KEY));

        return combineLatest([isConnected$, dataStored$])
            .pipe(flatMap((values => {
                const isConnected = values[0];
                const dataStored = values[1];
                if (isConnected) {
                    this.observable = this.getHttpMotifs();
                    return this.observable;
                } else {
                    if (dataStored) {
                        return of(dataStored);
                    } else if (this.observable) {
                        return this.observable;
                    }
                }
            })));
    }

    private getHttpMotifs(): Observable<any> {
        return this.http.get(this.RESOURCE_URL, {observe: 'response'})
            .pipe(
                map(response => {
                    this.observable = null; // RAZ de l'observable
                    if (response.ok) {
                        const motifs = response.body;
                        this.storage.setLocalData(this.INDEXED_KEY, motifs);
                        return motifs;
                    } else {
                        return 'Request failed.';
                    }
                }),
                share()
            );
    }
}
