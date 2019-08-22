import {Component, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {NetworkService} from '../services/core/network.service';
import {Subscription} from 'rxjs';
import {Events, Platform} from '@ionic/angular';
import {SignaturePad} from 'angular4-signaturepad/signature-pad';
import {File} from '@ionic-native/file/ngx';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {

    @ViewChild(SignaturePad, null) signaturePad: SignaturePad;

    private subDeconnection: Subscription;
    private subConnection: Subscription;
    private subChange: Subscription;
    private isConnected: boolean;
    private isReady: boolean;
    private downloadLink: string;

    private signaturePadOptions: object = { // passed through to szimek/signature_pad constructor
        minWidth: 5,
        canvasWidth: 500,
        canvasHeight: 300
    };

    constructor(private barcodeScanner: BarcodeScanner,
                private networkService: NetworkService,
                private events: Events,
                private zone: NgZone,
                private file: File,
                private platform: Platform) {
    }

    ngOnInit(): void {

        this.events.subscribe('updateScreen', () => {
            this.zone.run(() => {
                console.log('force update');
            });
        });

        this.platform.ready()
            .then(value => {
                this.isReady = true;
                this.subDeconnection = this.networkService.subscribeToDisconnection().subscribe(x => {
                    this.isConnected = true;
                });

                this.subConnection = this.networkService.subscribeToConnection().subscribe(y => {
                    this.isConnected = false;
                });

                this.subChange = this.networkService.subscribeOnChange().subscribe(connectionStatus => {
                    this.isConnected = connectionStatus.type === 'online';
                    this.events.publish('updateScreen');
                });
            })
            .catch(reason => this.isReady = false);
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

    drawComplete() {
        // will be notified of szimek/signature_pad's onEnd event
        this.downloadLink = this.signaturePad.toDataURL();
    }

    drawStart() {
        // will be notified of szimek/signature_pad's onBegin event
        console.log('begin drawing');
    }

    clear() {
        this.signaturePad.clear();
    }

    saveBitmap() {
        this.createDirectory()
            .then(value => {
                const path = this.file.dataDirectory .concat('sido_tc3');
                this.file.writeFile(path, 'test.png', this.downloadLink, {append: false, replace: true})
                    .then(value1 => {
                        console.log('Fichier correctement sauvegardé.' + value);
                    })
                    .catch(reason => console.error('Erreur lors de l\'écriture du fichier : ' + reason));
            })
            .catch(reason => console.error('Erreur lors de la création du dossier : ' + reason));
    }

    createDirectory(): Promise<boolean> {
        const uriDirectory = this.file.dataDirectory;
        console.log('dataDirectory : ' + this.file.dataDirectory);
        return new Promise<boolean>((resolve, reject) => {
            this.file.checkDir(uriDirectory, 'sido_tc3')
                .then(value => resolve(true))
                .catch(reason => {
                    this.file.createDir(uriDirectory, 'sido_tc3', false)
                        .then(value => resolve(true))
                        .catch(reason1 => reject(reason1));
                });
        });
    }
}
