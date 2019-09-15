import {Component, NgZone, OnInit} from '@angular/core';
import {MesureService} from '../../services/core/mesure.service';
import {MotifService} from '../../services/core/motif.service';
import {MotifMesureService} from '../../services/core/motif.mesure.service';
import {Events} from '@ionic/angular';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {Router} from '@angular/router';

@Component({
    selector: 'app-distribution',
    templateUrl: './distribution.page.html',
    styleUrls: ['./distribution.page.scss'],
})
export class DistributionPage implements OnInit {

    UPDATE_SCREEN = 'UPDATE_DISTRIBUTION_SCREEN';

    motifs: any[];
    mesures: any[];
    combinaisons: any[];

    mesuresAvailables: any[] = [];

    motifHasBeenSelected = false;
    mesureHasBeenSelected = false;

    codeBarre: string;

    typeDistribution = 'DISTRIBUTION';
    motifSelected: any;
    mesureSelected: any;

    signataire: string;

    constructor(
        private motifService: MotifService,
        private mesureService: MesureService,
        private motifMesuerService: MotifMesureService,
        private barcodeScanner: BarcodeScanner,
        private events: Events,
        private zone: NgZone,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.events.subscribe(this.UPDATE_SCREEN, () => {
            this.zone.run(args => {
            });
        });

        this.motifMesuerService.get()
            .subscribe(combinaisons => this.combinaisons = Object.values(combinaisons));

        this.motifService.get()
            .subscribe(motifs => this.motifs = Object.values(motifs));

        this.mesureService.get()
            .subscribe(mesures => this.mesures = Object.values(mesures));

        this.lancerCapture();
    }

    lancerCapture() {
        this.barcodeScanner.scan().then(barcodeData => {
            console.log('Barcode data', barcodeData);
            this.codeBarre = barcodeData.text;
        }).catch(err => {
            console.log('Error', err);
            this.router.navigate(['/menu']);
        });
    }

    changeTypeDistribution(typeDistribution: any) {
        this.typeDistribution = typeDistribution;
    }

    selectMotif(motif: any) {
        this.mesuresAvailables = [];
        this.mesureSelected = null;
        this.mesureHasBeenSelected = false;
        this.motifSelected = motif;
        this.combinaisons
            .filter(combinaison => combinaison && combinaison.codeMotif === motif.code)
            .forEach(combinaison => {
                this.mesures
                    .filter(mesure => mesure.code === combinaison.codeMesure)
                    .forEach(mesure => this.mesuresAvailables.push(mesure));
            });
        this.motifHasBeenSelected = true;
        this.events.publish(this.UPDATE_SCREEN);
    }

    selectMesure(mesureSelected: any) {
        this.mesureHasBeenSelected = true;
        this.mesureSelected = mesureSelected;
    }
}
