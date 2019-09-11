import * as tslib_1 from "tslib";
import { Component, NgZone, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';
import { SignaturePad } from 'angular4-signaturepad/signature-pad';
import { FileImageService } from '../../services/core/file-image.service';
import { DistributionLddEntity } from '../../domain/distribution-ldd.entity';
import { Events } from '@ionic/angular';
import { DistributionLddRepository } from '../../services/distribution.ldd.repository';
let SignatureComponent = class SignatureComponent {
    constructor(router, route, fileService, distributionLddService, location, events, zone) {
        this.router = router;
        this.route = route;
        this.fileService = fileService;
        this.distributionLddService = distributionLddService;
        this.location = location;
        this.events = events;
        this.zone = zone;
        this.signaturePadOptions = {
            minWidth: 3,
            canvasWidth: 400,
            canvasHeight: 400
        };
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let distributionLdd;
            distributionLdd = yield this.distributionLddService.getByCodeBarre(this.codeBarre);
            if (distributionLdd) {
                distributionLdd.statut = 'UPDATED';
            }
            else {
                distributionLdd = new DistributionLddEntity();
                distributionLdd.codeBarre = this.codeBarre;
                distributionLdd.pathSignature = this.fileEntry;
                distributionLdd.statut = 'NEW';
            }
            this.distributionLddService.distribuer(distributionLdd)
                .then(value => {
                console.log('Distribution correctement sauvegardée en base : ' + value);
                this.router.navigate(['/']);
            })
                .catch(reason => console.log('Erreur lors de l\'insertion en base : ' + reason));
        });
    }
    saveBitmap() {
        this.downloadLink = this.signaturePad.toDataURL('image/png', 0.5);
        this.fileService.saveFile(this.codeBarre + '.png', this.downloadLink)
            .then(value => {
            console.log('Fichier correctement sauvegardé : ' + value.fullPath);
            this.fileEntry = value.name;
            this.signed = true;
            this.events.publish('updateScreenSignature');
        })
            .catch(reason => alert('Echec de la sauvegarde du fichier : ' + reason));
    }
};
tslib_1.__decorate([
    ViewChild(SignaturePad, null),
    tslib_1.__metadata("design:type", SignaturePad)
], SignatureComponent.prototype, "signaturePad", void 0);
SignatureComponent = tslib_1.__decorate([
    Component({
        selector: 'app-signature',
        templateUrl: './signature.component.html',
        styleUrls: ['./signature.component.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [Router,
        ActivatedRoute,
        FileImageService,
        DistributionLddRepository,
        Location,
        Events,
        NgZone])
], SignatureComponent);
export { SignatureComponent };
//# sourceMappingURL=signature.component.js.map