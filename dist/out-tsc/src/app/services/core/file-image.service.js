import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { IMAGE_FOLDER_NAME } from '../../constant';
import { File } from '@ionic-native/file/ngx';
let FileImageService = class FileImageService {
    constructor(file) {
        this.file = file;
    }
    /**
     * Retournera true si le répertoire existe ou a bien été créé, false sinon.
     */
    initializationImageDirectory() {
        return this.file.checkDir(this.file.dataDirectory, IMAGE_FOLDER_NAME)
            .then(() => this.getDirectory())
            .catch(() => this.createDirectory());
    }
    createDirectory() {
        return new Promise((resolve, reject) => {
            this.file.createDir(this.file.dataDirectory, IMAGE_FOLDER_NAME, true)
                .then(directoryEntry => resolve(directoryEntry))
                .catch(reason => reject('Erreur lors de la création du dossier : ' + reason));
        });
    }
    getDirectory() {
        return this.file.resolveDirectoryUrl(this.file.dataDirectory.concat(IMAGE_FOLDER_NAME))
            .then(directoryEntry => new Promise(resolve => resolve(directoryEntry)));
    }
    /**
     * Permet de sauvegarder un fichier dans le répertoire
     */
    saveFile(fileName, fileToSave, opts, dir) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            opts = (opts) ? opts : { replace: true };
            dir = (dir) ? dir : yield this.getDirectory();
            const directoryPath = dir.toURL();
            const blob = yield (yield fetch(fileToSave)).blob();
            return this.file.writeFile(directoryPath, fileName, blob, opts);
        });
    }
};
FileImageService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [File])
], FileImageService);
export { FileImageService };
//# sourceMappingURL=file-image.service.js.map