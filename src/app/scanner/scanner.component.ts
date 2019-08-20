import {Component, OnInit} from '@angular/core';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {Router} from '@angular/router';

@Component({
    selector: 'app-scanner',
    templateUrl: './scanner.component.html',
    styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent implements OnInit {

    constructor(private router: Router,
                private barcodeScanner: BarcodeScanner) {
    }

    ngOnInit() {
    }


}
