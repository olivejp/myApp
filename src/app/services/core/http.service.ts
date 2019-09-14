import {Injectable, OnDestroy} from '@angular/core';
import {NetworkService} from './network.service';
import {Observable, Subscription} from 'rxjs';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {IndexeddbService} from '../../technical/service/indexeddb.service';

@Injectable({
    providedIn: 'root'
})
export class HttpService implements OnDestroy {

    $onConnected: Subscription;
    isConnected: boolean;

    constructor(
        private networkService: NetworkService,
        private http: HttpClient,
        private storageService: IndexeddbService
    ) {
        this.$onConnected = this.networkService.isConnected().subscribe(isConnected => {
            this.isConnected = isConnected;
        });
    }

    makeHttpRequest(request: HttpRequest<any>): Observable<any> {
        if (this.isConnected) {
            return this.http.request(request);
        } else {
        }
    }

    ngOnDestroy(): void {
        if (this.$onConnected) {
            this.$onConnected.unsubscribe();
        }
    }
}
