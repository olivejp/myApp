import {Injectable} from '@angular/core';
import {IMAGE_FOLDER_NAME} from '../../constant';
import {DirectoryEntry, File, IWriteOptions} from '@ionic-native/file/ngx';

@Injectable({
    providedIn: 'root'
})
export class FileImageService {

    constructor(private file: File) {
    }

    private imgDir: DirectoryEntry;

    public static getContentType(base64Data: any) {
        console.log('Récupération du type de content');
        const block = base64Data.split(';');
        return block[0].split(':')[1];
    }

    public static base64toBlob(b64Data, contentType): Blob {
        console.log('Transformation du fichier en Blob');
        contentType = contentType || '';
        const sliceSize = 512;
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        return new Blob(byteArrays, {
            type: contentType
        });
    }

    /**
     * Retournera true si le répertoire existe ou a bien été créé, false sinon.
     */
    initializationImageDirectory(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.file.checkDir(this.file.dataDirectory, IMAGE_FOLDER_NAME)
                .then(value => this.getDirectory(resolve, reject))
                .catch(reason => this.createDirectory(resolve, reject));
        });
    }

    private createDirectory(resolve: (value?: boolean | PromiseLike<boolean>) => void, reject: (reason?: any) => void) {
        console.log('Création du répertoire');
        this.file.createDir(this.file.dataDirectory, IMAGE_FOLDER_NAME, true)
            .then(directoryEntry => {
                this.imgDir = directoryEntry;
                resolve(true);
            })
            .catch(reason1 => reject('Erreur lors de la création du dossier : ' + reason1));
    }

    private getDirectory(resolve: (value?: boolean | PromiseLike<boolean>) => void, reject: (reason?: any) => void) {
        console.log('Récupération du répertoire');
        this.file.resolveDirectoryUrl(this.file.dataDirectory.concat(IMAGE_FOLDER_NAME))
            .then(directoryEntry => {
                this.imgDir = directoryEntry;
                resolve(true);
            })
            .catch(reason => reject('Erreur lors de la récupération du dossier : ' + reason));
    }

    /**
     * Permet de sauvegarder un fichier dans le répertoire
     */
    async saveFile(fileName: string, fileToSave: any, opts?: IWriteOptions, dir?: DirectoryEntry): Promise<any> {
        console.log('Sauvegarde du fichier');
        opts = (opts) ? opts : {replace: true};
        dir = (dir) ? dir : this.imgDir;
        const directoryPath = dir.toURL();
        const blob = await (await fetch(fileToSave)).blob();
        return this.file.writeFile(directoryPath, fileName, blob, opts);
    }
}
