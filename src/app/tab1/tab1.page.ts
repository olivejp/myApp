import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {NetworkService} from '../services/network.service';
import {Subscription} from 'rxjs';
import {Events} from '@ionic/angular';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {

    private subDeconnection: Subscription;
    private subConnection: Subscription;
    private subChange: Subscription;
    private isConnected: boolean;

    constructor(private barcodeScanner: BarcodeScanner,
                private networkService: NetworkService,
                private events: Events,
                private zone: NgZone) {
    }

    ngOnInit(): void {

        this.events.subscribe('updateScreen', () => {
            this.zone.run(() => {
                console.log('force update');
            });
        });

        this.subDeconnection = this.networkService.subscribeToDisconnection().subscribe(value => {
            this.isConnected = true;
        });

        this.subConnection = this.networkService.subscribeToConnection().subscribe(value => {
            this.isConnected = false;
        });

        this.subChange = this.networkService.subscribeOnChange().subscribe(value => {
            this.isConnected = value.type === 'online';
            this.events.publish('updateScreen');
        });
    }

    ngOnDestroy(): void {
        if (this.subConnection != null) {
            this.subConnection.unsubscribe();
        }
        if (this.subDeconnection != null) {
            this.subDeconnection.unsubscribe();
        }
        if (this.subChange != null) {
            this.subChange.unsubscribe();
        }
    }

    lancerCapture() {
        this.barcodeScanner.scan().then(barcodeData => {
            console.log('Barcode data', barcodeData);
        }).catch(err => {
            console.log('Error', err);
        });
    }
}
