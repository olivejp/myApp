import {Injectable} from '@angular/core';
import {SQLiteObject} from '@ionic-native/sqlite';
import {DB_NAME} from '../constant';
import {SQLite} from '@ionic-native/sqlite/ngx';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    private sqliteObject: SQLiteObject;

    constructor(private sqlite: SQLite) {
    }

    getDb(): SQLiteObject {
        return this.sqliteObject;
    }

    /**
     * Permet de vérifier l'existence d'une table dans la base
     */
    checkTableExistence(tableName: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            if (!this.sqliteObject) {
                reject('Objet SQLite undéfini');
            }
            this.sqliteObject.executeSql('SELECT name FROM sqlite_master WHERE type=\'table\' AND name= ' + tableName)
                .then(v => resolve(true))
                .catch(reason => reject(reason));
        });
    }

    /**
     * Retournera true si la base a bien été créée ou lue, false sinon.
     */
    initializationDatabase(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.sqlite.create({
                name: DB_NAME,
                location: 'default'
            })
                .then(sqliteObject => this.sqliteObject = sqliteObject)
                .catch(reason => reject(reason));
        });
    }

    launchMigrationJob(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.checkTableExistence('MIGRATION');
        });
    }
}
