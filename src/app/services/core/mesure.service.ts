import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NetworkService} from './network.service';
import {IndexeddbService} from '../../technical/service/indexeddb.service';
import {GetService} from './get.service';

export const MESURE_URL = 'https://sidomobile-c6d38.firebaseio.com/mesures.json';
export const MESURE_KEY = 'MESURES';

@Injectable({
    providedIn: 'root'
})
export class MesureService extends GetService<any> {

    resourceUrl: string;
    indexKey: string;

    constructor(private http: HttpClient,
                private networdkService: NetworkService,
                private storage: IndexeddbService) {
        super(http, networdkService, storage);
        this.resourceUrl = MESURE_URL;
        this.indexKey = MESURE_KEY;
    }

}
