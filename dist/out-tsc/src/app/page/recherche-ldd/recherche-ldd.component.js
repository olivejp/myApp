import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { ToastController } from '@ionic/angular';
import { IndexeddbService } from '../../technical/service/indexeddb.service';
import { IMAGE_FOLDER_NAME } from '../../constant';
import { DistributionLddRepository } from '../../services/distribution.ldd.repository';
let RechercheLddComponent = class RechercheLddComponent {
    constructor(lddRepository, file, toastController, storage) {
        this.lddRepository = lddRepository;
        this.file = file;
        this.toastController = toastController;
        this.storage = storage;
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
            }
            else {
                this.playToast('Aucun enregistrement trouvé');
            }
        })
            .catch(reason => console.error(reason));
    }
    playToast(text) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                message: text,
                duration: 3000
            });
            toast.present();
        });
    }
    getAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.storage.setLocalData('ldd', ['Salut', 'Hello', 'Buongiorno']);
            const returnedValue = yield this.storage.getLocalData('Bonjour');
            console.log(returnedValue);
        });
    }
};
RechercheLddComponent = tslib_1.__decorate([
    Component({
        selector: 'app-recherche-ldd',
        templateUrl: './recherche-ldd.component.html',
        styleUrls: ['./recherche-ldd.component.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [DistributionLddRepository,
        File,
        ToastController,
        IndexeddbService])
], RechercheLddComponent);
export { RechercheLddComponent };
//# sourceMappingURL=recherche-ldd.component.js.map