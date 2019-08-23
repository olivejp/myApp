import {Injectable} from '@angular/core';
import {SQLiteObject} from '@ionic-native/sqlite';
import {DB_NAME} from '../../constant';
import {SQLite} from '@ionic-native/sqlite/ngx';
import {DistributionLddEntity} from '../../domain/distribution-ldd.entity';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    constructor(private sqlite: SQLite) {
        const distri: DistributionLddEntity = new DistributionLddEntity();
        console.log(distri.getSqlCreate());
    }

    /**
     * Permet de vérifier l'existence d'une table dans la base
     */
    checkTableExistence(tableName: string): Promise<boolean> {
        const promiseA = new Promise<boolean>((resolve, reject) => {
            this.getOrInitDB()
                .then(sqliteObject => {
                    const sql = 'SELECT * FROM ' + tableName + ')';
                    sqliteObject.executeSql(sql)
                        .then(value => resolve(!!(value)))
                        .catch(reason => {
                            if (reason.rows) {
                                resolve(true);
                            } else {
                                reject(reason);
                            }
                        });
                })
                .catch(reason => reject(reason));
        });

        // Création d'un timeout dans le cas ou la requête SELECT n'aboutit pas.
        const promiseB = new Promise<boolean>((resolve, reject) => {
            const wait = setTimeout(() => {
                clearTimeout(wait);
                resolve(false);
            }, 800);
        });

        return Promise.race([promiseA, promiseB]);
    }

    /**
     * Retournera un objet SQLite si la base a bien été créée ou acquise.
     */
    getOrInitDB(): Promise<SQLiteObject> {
        return this.sqlite.create({
            name: DB_NAME,
            location: 'default'
        });
    }

    executeSql(sqlStatement: string, params?: any[]): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.getOrInitDB()
                .then(sqlObject => {
                    sqlObject.executeSql(sqlStatement, params)
                        .then(value => resolve(value))
                        .catch(reason => reject(reason));
                })
                .catch(reason => reject(reason));
        });
    }
}
