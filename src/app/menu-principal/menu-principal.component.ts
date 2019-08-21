import {Component, OnInit} from '@angular/core';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-menu-principal',
    templateUrl: './menu-principal.component.html',
    styleUrls: ['./menu-principal.component.scss'],
})
export class MenuPrincipalComponent implements OnInit {

    constructor(private barcodeScanner: BarcodeScanner,
                private router: Router,
                private toastController: ToastController) {
    }

    ngOnInit() {
    }

    lancerCapture() {
        this.barcodeScanner.scan().then(barcodeData => {
            console.log('Barcode data', barcodeData);
            this.router.navigate(['/signature', {codeBarre: barcodeData.text}]);
        }).catch(err => {
            console.log('Error', err);
        });
    }

    async playToast() {
        const toast = await this.toastController.create({
            message: 'Your settings have been saved.',
            duration: 2000
        });
        toast.present();
    }

}
