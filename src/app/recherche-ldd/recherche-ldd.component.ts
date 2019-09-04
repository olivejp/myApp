import {Component, OnInit} from '@angular/core';
import {DistributionLddEntity} from '../domain/distribution-ldd.entity';
import {DistributionLddRepository} from '../services/distribution.ldd.repository';
import {File} from '@ionic-native/file/ngx';
import {IMAGE_FOLDER_NAME} from '../constant';
import {ToastController} from '@ionic/angular';
import {IndexeddbService} from '../technical/orm/service/indexeddb.service';

@Component({
    selector: 'app-recherche-ldd',
    templateUrl: './recherche-ldd.component.html',
    styleUrls: ['./recherche-ldd.component.scss'],
})
export class RechercheLddComponent implements OnInit {
    private numLddSearch: number;
    distriLdd: DistributionLddEntity;
    private imageUrl;

    constructor(private lddRepository: DistributionLddRepository,
                private file: File,
                private toastController: ToastController,
                private storage: IndexeddbService) {
    }

    ngOnInit() {
    }

    search() {
        this.distriLdd = undefined;
        this.imageUrl = undefined;
        this.lddRepository.findById(this.numLddSearch)
            .then(distriLddRead => {
                if (distriLddRead) {
                    this.distriLdd = distriLddRead;
                    if (this.distriLdd.pathSignature) {
                        this.file.readAsDataURL(this.file.dataDirectory.concat(IMAGE_FOLDER_NAME), this.distriLdd.pathSignature)
                            .then(textRead => this.imageUrl = textRead)
                            .catch(reason => console.error(reason));
                    }
                } else {
                    this.playToast('Aucun enregistrement trouvé');
                }
            })
            .catch(reason => console.error(reason));
    }

    async playToast(text) {
        const toast = await this.toastController.create({
            message: text,
            duration: 3000
        });
        toast.present();
    }

    async getAll() {
        await this.storage.setLocalData('ldd', ['Salut', 'Hello', 'Buongiorno']);
        const returnedValue = await this.storage.getLocalData('Bonjour');
        console.log(returnedValue);
    }
}
