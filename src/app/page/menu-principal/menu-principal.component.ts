import {Component, NgZone, OnInit} from '@angular/core';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {Router} from '@angular/router';
import {ActionSheetController, Events, ToastController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {NetworkService} from '../../services/core/network.service';
import {MotifService} from '../../services/core/motif.service';
import {MesureService} from '../../services/core/mesure.service';

@Component({
    selector: 'app-menu-principal',
    templateUrl: './menu-principal.component.html',
    styleUrls: ['./menu-principal.component.scss'],
})
export class MenuPrincipalComponent implements OnInit {

    annonces: any;

    constructor(private actionSheetController: ActionSheetController,
                private barcodeScanner: BarcodeScanner,
                private router: Router,
                private toastController: ToastController,
                private motifsService: MotifService,
                private mesureService: MesureService
    ) {
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

    playToast(text) {
        this.toastController.create({
            message: text,
            duration: 3000
        }).then(toast => toast.present());
    }

    async playActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Albums',
            buttons: [{
                text: 'Delete',
                role: 'destructive',
                icon: 'trash',
                handler: () => this.playToast('Delete')
            }, {
                text: 'Share',
                icon: 'share',
                handler: () => this.playToast('Share')
            }, {
                text: 'Play (open modal)',
                icon: 'arrow-dropright-circle',
                handler: () => this.playToast('Play')
            }, {
                text: 'Favorite',
                icon: 'heart',
                handler: () => this.playToast('Favorite')
            }, {
                text: 'Cancel',
                icon: 'close',
                role: 'cancel',
                handler: () => this.playToast('Cancel')
            }]
        });
        await actionSheet.present();
    }

    appelWs() {
        this.motifsService.getMotifs().subscribe(motifs => {
            this.annonces = motifs;
        });
        // this.mesureService.getMesures().subscribe(mesures => {
        //     this.annonces = mesures;
        // });
    }
}
