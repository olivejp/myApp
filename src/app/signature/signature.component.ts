import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {map} from 'rxjs/operators';
import {SignaturePad} from 'angular4-signaturepad/signature-pad';
import {FileImageService} from '../services/core/file-image.service';
import {DistributionLddRepository} from '../services/distribution.ldd.repository';
import {DistributionLddEntity} from '../domain/distribution-ldd.entity';
import {Events} from '@ionic/angular';

@Component({
    selector: 'app-signature',
    templateUrl: './signature.component.html',
    styleUrls: ['./signature.component.scss'],
})
export class SignatureComponent implements OnInit {
    @ViewChild(SignaturePad, null) signaturePad: SignaturePad;
    private codeBarre: string;
    private downloadLink: string;
    private signed: boolean;
    private fileEntry: any;
    private signaturePadOptions: object = {
        minWidth: 3,
        canvasWidth: 400,
        canvasHeight: 400
    };

    constructor(private router: Router,
                private route: ActivatedRoute,
                private fileService: FileImageService,
                private distributionLddService: DistributionLddRepository,
                private location: Location,
                private events: Events,
                private zone: NgZone) {
    }

    ngOnInit() {
        this.route.paramMap.pipe(map(params => {
            this.codeBarre = params.get('codeBarre');
        })).subscribe(value => console.log(value));

        this.events.subscribe('updateScreenSignature', () => {
            this.zone.run(() => {
                console.log('force update');
            });
        });
    }

    cancel() {
        this.location.back();
    }

    drawComplete() {
        // Do something when draw is complete.
    }

    drawStart() {
        console.log('begin drawing');
    }

    clear() {
        this.signaturePad.clear();
    }

    retry() {
        this.signed = false;
        this.events.publish('updateScreenSignature');
    }

    validate() {
        const distributionLdd = new DistributionLddEntity();
        distributionLdd.codeBarre = this.codeBarre;
        distributionLdd.pathSignature = this.fileEntry;
        this.distributionLddService.distribuer(distributionLdd)
            .then(value => {
                alert('Distribution correctement enregistrée en base');
                this.router.navigate(['/']);
            })
            .catch(reason => console.log('Erreur lors de l\'insertion en base : ' + reason));
    }

    saveBitmap() {
        this.downloadLink = this.signaturePad.toDataURL('image/png', 0.5);
        this.fileService.saveFile(this.codeBarre + '.png', this.downloadLink)
            .then(value => {
                this.fileEntry = value.fullPath;
                this.signed = true;
            })
            .catch(reason => alert('Echec de la sauvegarde du fichier : ' + reason));
    }
}
