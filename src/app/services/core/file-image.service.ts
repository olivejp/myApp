import {Injectable} from '@angular/core';
import {IMAGE_FOLDER_NAME} from '../../constant';
import {DirectoryEntry, File, IWriteOptions} from '@ionic-native/file/ngx';

@Injectable({
    providedIn: 'root'
})
export class FileImageService {

    constructor(private file: File) {
    }

    /**
     * Retournera true si le répertoire existe ou a bien été créé, false sinon.
     */
    initializationImageDirectory(): Promise<DirectoryEntry> {
        console.log('Initialisation Image Directory');
        return this.file.checkDir(this.file.dataDirectory, IMAGE_FOLDER_NAME)
            .then(() => this.getDirectory())
            .catch(() => this.createDirectory());
    }

    private createDirectory(): Promise<DirectoryEntry> {
        console.log('Création Image Directory');
        return this.file.createDir(this.file.dataDirectory, IMAGE_FOLDER_NAME, true);
    }

    getDirectory(): Promise<DirectoryEntry> {
        console.log('Récupération Image Directory');
        return this.file.resolveDirectoryUrl(this.file.dataDirectory.concat(IMAGE_FOLDER_NAME));
    }

    /**
     * Permet de sauvegarder un fichier dans le répertoire
     */
    async saveFile(fileName: string, fileToSave: any, opts?: IWriteOptions, dir?: DirectoryEntry): Promise<any> {
        opts = (opts) ? opts : {replace: true};
        dir = (dir) ? dir : await this.getDirectory();
        const directoryPath = dir.toURL();
        const blob = await (await fetch(fileToSave)).blob();
        return this.file.writeFile(directoryPath, fileName, blob, opts);
    }
}
