import {Injectable} from '@angular/core';
import {SQLiteObject} from '@ionic-native/sqlite/ngx';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    private db: SQLiteObject;

    constructor() {
    }

    initDatabase(db: SQLiteObject) {
        if (!db) {
            console.error('initDatabase can\'t be call with a null parameter');
        }
        this.db = db;
    }

    executeSql(statement: string, params?: any[]): Promise<any> {
        if (!this.db) {
            console.error('DatabaseService needs a SqliteObject to work. Have you initDatabase() ?');
        }
        return this.db.executeSql(statement, params);
    }

    createTable(entity: any): Promise<any> {
        const proto = Object.getPrototypeOf(entity);
        if (!this.db) {
            console.error('DatabaseService needs a SqliteObject to work. Have you initDatabase() ?');
        }
        if (!proto[`isEntity`]) {
            console.error('Parameter is not an entity. Missing property `isEntity` in the prototype.');
        }
        if (!proto[`getCreateSql`]) {
            console.error('Parameter is not an entity. Missing method `getCreateSql` in the prototype.');
        }
        return this.db.executeSql(proto.getCreateSql());
    }

    checkTable(entity: any): Promise<boolean> {
        const proto = Object.getPrototypeOf(entity);
        if (!proto[`isEntity`]) {
            console.error('Parameter is not an entity. Missing property `isEntity` in the prototype.');
        }
        if (!proto[`getTableName`]) {
            console.error('Parameter is not an entity. Missing method `getTableName` in the prototype.');
        }

        return new Promise<boolean>((resolve, reject) => {
            const tableName: string = proto.getTableName();
            this.checkTableExistence(tableName)
                .then(value => {
                    if (value) {
                        resolve(true);
                    } else {
                        this.createTable(entity)
                            .then(value1 => resolve(true))
                            .catch(reason => reject(reason));
                    }
                })
                .catch(reason => reject(reason));
        });
    }

    /**
     * Permet de vérifier l'existence d'une table dans la base
     * On associe un timeout car dans le cas où la table n'existe pas, la promiseA ne renvoie rien (ni then, ni catch)
     */
    checkTableExistence(tableName: string): Promise<boolean> {
        if (!this.db) {
            console.error('DatabaseService needs a SqliteObject to work. Have you initDatabase() ?');
        }

        const sql = 'SELECT * FROM ' + tableName;
        const promiseA = new Promise<boolean>((resolve, reject) => {
            this.db.executeSql(sql)
                .then(value => resolve(!!(value)))
                .catch(result => {
                    if (result.rows) {
                        resolve(true);
                    } else {
                        reject(result);
                    }
                });
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
}
