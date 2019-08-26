import {Component, OnInit} from '@angular/core';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {DistributionLddRepository} from '../services/distribution.ldd.repository';

@Component({
    selector: 'app-menu-principal',
    templateUrl: './menu-principal.component.html',
    styleUrls: ['./menu-principal.component.scss'],
})
export class MenuPrincipalComponent implements OnInit {
    private numLdd;

    constructor(private barcodeScanner: BarcodeScanner,
                private router: Router,
                private lddRepository: DistributionLddRepository,
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

    async playToast(text) {
        const toast = await this.toastController.create({
            message: text,
            duration: 3000
        });
        toast.present();
    }

    lancerRecherche() {
        this.lddRepository.findById(this.numLdd)
            .then(value => this.playToast(value.toString()))
            .catch(reason => console.error(reason));
    }
}
