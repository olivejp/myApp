import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {map,} from 'rxjs/operators';
import {SignaturePad} from 'angular4-signaturepad/signature-pad';
import {File} from '@ionic-native/file/ngx';
import {IMAGE_FOLDER_NAME} from '../constant';

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
                private file: File,
                private location: Location) {
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
        this.createDirectory()
            .then(value => {
                const path = this.file.dataDirectory.concat('sido_tc3');
                this.file.writeFile(path, this.codeBarre + '.png', this.downloadLink, {append: false, replace: true})
                    .then(va => {
                        console.log('Signature correctement sauvegardé');
                        this.imgSource = path;
                    })
                    .catch(reason => console.log('Erreur lors de l\'écriture du fichier : ' + reason));
            })
            .catch(reason => console.error('Erreur lors de la création du dossier : ' + reason));
    }

    /**
     * Retournera true si le répertoire existe ou a bien été créé, false sinon.
     */
    createDirectory(): Promise<boolean> {
        const uriDirectory = this.file.dataDirectory;
        return new Promise<boolean>((resolve, reject) => {
            this.file.checkDir(uriDirectory, IMAGE_FOLDER_NAME)
                .then(value => resolve(true))
                .catch(reason => {
                    this.file.createDir(uriDirectory, IMAGE_FOLDER_NAME, false)
                        .then(value => resolve(true))
                        .catch(reason1 => reject(reason1));
                });
        });
    }
}
