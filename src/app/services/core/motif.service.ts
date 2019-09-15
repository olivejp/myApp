import {Injectable} from '@angular/core';
import {combineLatest, from, Observable, of, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {flatMap, map, share} from 'rxjs/operators';
import {NetworkService} from './network.service';
import {IndexeddbService} from '../../technical/service/indexeddb.service';
import {GetService} from './get.service';

export const MOTIF_URL = 'https://sidomobile-c6d38.firebaseio.com/motifs.json';
export const MOTIF_KEY = 'MOTIFS';

@Injectable({
    providedIn: 'root'
})
export class MotifService extends GetService<any> {

    resourceUrl = MOTIF_URL;
    indexKey = MOTIF_KEY;

    constructor(private storage: IndexeddbService,
                private networdkService: NetworkService,
                private http: HttpClient
    ) {
        super(http, networdkService, storage);
    }
}
