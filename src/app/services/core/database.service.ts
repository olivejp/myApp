import {Injectable} from '@angular/core';
import {SQLiteObject} from '@ionic-native/sqlite';
import {DB_LOCATION, DB_NAME} from '../../constant';
import {SQLite} from '@ionic-native/sqlite/ngx';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    constructor(private sqlite: SQLite) {
    }

    /**
     * Retournera un objet SQLite si la base a bien été créée ou acquise.
     */
    getOrInitDB(): Promise<SQLiteObject> {
        return this.sqlite.create({
            name: DB_NAME,
            location: DB_LOCATION
        });
    }

    /**
     * Permet de vérifier l'existence d'une table dans la base
     * On associe un timeout car dans le cas où la table n'existe pas, la promiseA ne renvoie rien (ni then, ni catch)
     */
    checkTableExistence(tableName: string): Promise<boolean> {
        const sql = 'SELECT * FROM ' + tableName;
        const promiseA = new Promise<boolean>((resolve, reject) => {
            this.getOrInitDB().then(sqliteObject => {
                sqliteObject.executeSql(sql)
                    .then(value => resolve(!!(value)))
                    .catch(reason => {
                        if (reason.rows) {
                            resolve(true);
                        } else {
                            reject(reason);
                        }
                    });
            }).catch(reason => reject(reason));
        });

        // Création d'un timeout dans le cas ou la requête SELECT n'aboutit pas.
        const promiseB = new Promise<boolean>((resolve) => {
            const wait = setTimeout(() => {
                clearTimeout(wait);
                resolve(false);
            }, 800);
        });

        return Promise.race([promiseA, promiseB]);
    }

    executeSql(sqlStatement: string, params?: any[]): Promise<any> {
        return this.getOrInitDB().then(sqlObject => sqlObject.executeSql(sqlStatement, params));
    }
}
