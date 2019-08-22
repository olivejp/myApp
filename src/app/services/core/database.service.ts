import {Injectable} from '@angular/core';
import {SQLiteObject} from '@ionic-native/sqlite';
import {DB_NAME} from '../../constant';
import {SQLite} from '@ionic-native/sqlite/ngx';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    constructor(private sqlite: SQLite) {
    }

    /**
     * Permet de vérifier l'existence d'une table dans la base
     */
    checkTableExistence(tableName: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.getOrInitDB().then(sqliteObject => {
                sqliteObject.executeSql('SELECT name FROM sqlite_master WHERE type=\'table\' AND name= ' + tableName)
                    .then(value => resolve(true))
                    .catch(reason => reject(reason));
            });
        });
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

    async executeSql(sqlStatement: string, params?: any[]): Promise<any> {
        return (await this.getOrInitDB()).executeSql(sqlStatement, params);
    }
}
