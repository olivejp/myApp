import {Injectable} from '@angular/core';
import {Network} from '@ionic-native/network/ngx';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NetworkService {

    constructor(private network: Network) {
    }

    subscribeToDisconnection(): Observable<any> {
        return this.network.onDisconnect();
    }

    subscribeToConnection(): Observable<any> {
        return this.network.onConnect();
    }

    subscribeOnChange(): Observable<any> {
        return this.network.onchange();
    }
}
