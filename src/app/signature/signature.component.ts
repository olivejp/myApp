import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {map} from 'rxjs/operators';
import {SignaturePad} from 'angular4-signaturepad/signature-pad';
import {FileImageService} from '../services/file-image.service';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-signature',
    templateUrl: './signature.component.html',
    styleUrls: ['./signature.component.scss'],
})
export class SignatureComponent implements OnInit {
    @ViewChild(SignaturePad, null) signaturePad: SignaturePad;
    private imgSource: string;
    private codeBarre: string;
    private downloadLink: string;
    private signaturePadOptions: object = {
        minWidth: 5,
        canvasWidth: 500,
        canvasHeight: 500
    };

    constructor(private route: ActivatedRoute,
                private fileService: FileImageService,
                private location: Location,
                private toastController: ToastController) {
    }

    ngOnInit() {
        this.route.paramMap.pipe(map(params => {
            this.codeBarre = params.get('codeBarre');
        })).subscribe(value => console.log(value));
    }

    cancel() {
        this.location.back();
    }

    drawComplete() {
        this.downloadLink = this.signaturePad.toDataURL();
    }

    drawStart() {
        console.log('begin drawing');
    }

    clear() {
        this.signaturePad.clear();
    }

    saveBitmap() {
        this.fileService.saveFile(this.codeBarre + '.png', this.downloadLink)
            .then(value => {
                this.toastController.create({
                    message: 'Signature correctement sauvegardé',
                    animated: true,
                    duration: 2000
                }).then(toast => toast.present());
            })
            .catch(reason => {
                this.toastController.create({
                    message: 'Erreur lors de l\'écriture du fichier : ' + reason,
                    animated: true,
                    duration: 2000
                }).then(toast => toast.present());
            });
    }
}
