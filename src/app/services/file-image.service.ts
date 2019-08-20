import {Injectable} from '@angular/core';
import {IMAGE_FOLDER_NAME} from '../constant';
import {File, IWriteOptions} from '@ionic-native/file/ngx';

@Injectable({
    providedIn: 'root'
})
export class FileImageService {

    private imageDirectory: string;

    constructor(private file: File) {
    }

    /**
     * Retournera true si le répertoire existe ou a bien été créé, false sinon.
     */
    initializationImageDirectory(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.file.checkDir(this.file.dataDirectory, IMAGE_FOLDER_NAME)
                .then(value => {
                    this.imageDirectory = this.file.dataDirectory.concat(IMAGE_FOLDER_NAME);
                    resolve(true);
                })
                .catch(reason => {
                    this.file.createDir(this.imageDirectory, IMAGE_FOLDER_NAME, false)
                        .then(value => resolve(true))
                        .catch(reason1 => reject('Erreur lors de la création du dossier : ' + reason1));
                });
        });
    }

    /**
     * Permet de sauvegarder un fichier dans le répertoire
     */
    saveFile(fileName: string, fileToSave: any, options?: IWriteOptions): Promise<any> {
        if (!options) {
            options = {append: true, replace: true};
        }
        return this.file.writeFile(this.imageDirectory, fileName, fileToSave, options);
    }
}
