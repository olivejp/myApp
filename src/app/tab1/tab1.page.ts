import {Component, OnDestroy, OnInit} from '@angular/core';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {NetworkService} from '../services/network.service';
import {Observable, Subscription} from 'rxjs';

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
                private networkService: NetworkService) {
    }

    ngOnInit(): void {
        this.subDeconnection = this.networkService.subscribeToDisconnection().subscribe(value => {
            console.log('disconnected');
            this.isConnected = false;
        });

        this.subConnection = this.networkService.subscribeToConnection().subscribe(value => {
            console.log('connected');
            this.isConnected = true;
        });

        this.subChange = this.networkService.subscribeOnChange().subscribe(value => {
            console.log('change');
            this.isConnected = true;
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
