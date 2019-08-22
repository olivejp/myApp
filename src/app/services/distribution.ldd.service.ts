import {Injectable} from '@angular/core';
import {DatabaseService} from './core/database.service';


@Injectable({
    providedIn: 'root'
})
export class DistributionLddService {

    public static TABLE_NAME = 'element_ldd';
    public static COL_ID = 'id';
    public static COL_DATE_CREATION = 'date_creation';
    public static COL_DATE_DISTRIBUTION = 'date_distribution';
    public static COL_LDD = 'ldd';
    public static COL_CODE_BARRE = 'code_barre';
    public static COL_STATUT = 'statut';
    public static COL_STATUT_RESEAU = 'statut_reseau';
    public static COL_PATH_SIGNATURE_IMAGE = 'path_signature';
    public static COL_TYPE_DISTRIBUTION = 'type_distribution';

    constructor(private databaseService: DatabaseService) {
    }

    isTableExistsOrCreate(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.databaseService.checkTableExistence(DistributionLddService.TABLE_NAME)
                .then(value => {
                    if (value) {
                        resolve(true);
                    } else {
                        // tslint:disable-next-line:max-line-length
                        const requestToCreate = 'CREATE TABLE ' + DistributionLddService.TABLE_NAME + ' (' +
                            DistributionLddService.COL_ID + ' INTEGER PRIMARY KEY AUTOINCREMENT,' +
                            DistributionLddService.COL_DATE_CREATION + ' TEXT,' + // sous forme YYYY-MM-DD HH:MM:SS.SSS
                            DistributionLddService.COL_DATE_DISTRIBUTION + ' TEXT,' + // sous forme YYYY-MM-DD HH:MM:SS.SSS
                            DistributionLddService.COL_LDD + ' INTEGER,' + // clé étrangère vers le numéro de la LDD
                            DistributionLddService.COL_STATUT + ' TEXT,' + // statut de la distribution
                            // tslint:disable-next-line:max-line-length
                            DistributionLddService.COL_STATUT_RESEAU + ' TEXT,' + // permet de savoir si la distribution a été synchronisée ou pas
                            // tslint:disable-next-line:max-line-length
                            DistributionLddService.COL_CODE_BARRE + ' TEXT NOT NULL,' + // le code barre de l'objet que l'on tente de distribuer
                            // tslint:disable-next-line:max-line-length
                            DistributionLddService.COL_PATH_SIGNATURE_IMAGE + ' TEXT,' + // le chemin vers le fichier image contenant la signature
                            DistributionLddService.COL_TYPE_DISTRIBUTION + ' TEXT)'; // valeur entre DISTRIBUTION et NON_DISTRIBUTION

                        this.databaseService.executeSql(requestToCreate)
                            .then(value1 => resolve(true))
                            .catch(reason => reject(reason));
                    }
                })
                .catch(reason => reject(reason));
        });
    }

    distribuer(codeBarre: string, pathToSignature: string): Promise<any> {
        return this.isTableExistsOrCreate()
            .then(value => {
                const sqlInsert = 'INSERT INTO ' + DistributionLddService.TABLE_NAME +
                    ' (' + DistributionLddService.COL_CODE_BARRE +
                    ', ' + DistributionLddService.COL_TYPE_DISTRIBUTION +
                    ', ' + DistributionLddService.COL_PATH_SIGNATURE_IMAGE +
                    ') VALUES (\'' + codeBarre + '\', \'DISTRIBUTION\', \'' + pathToSignature + '\')';

                return this.databaseService.executeSql(sqlInsert);
            })
            .catch(reason => console.log('Erreur lors de l\'insertion : ' + reason));
    }
}
