import {Injectable} from '@angular/core';
import {Network} from '@ionic-native/network/ngx';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NetworkService {

    connected: BehaviorSubject<boolean>;
    $onChange: Subscription;

    constructor(private network: Network) {
        this.connected = new BehaviorSubject<boolean>(false);
        this.$onChange = this.subscribeOnChange().subscribe(value => {
            this.connected.next((value.type === 'online'));
        });
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

    isConnected(): Observable<boolean> {
        return this.connected;
    }
}
