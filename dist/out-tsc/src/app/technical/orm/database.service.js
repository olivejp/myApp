import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let DatabaseService = class DatabaseService {
    constructor() {
    }
    initDatabase(db) {
        if (!db) {
            console.error('initDatabase can\'t be call with a null parameter');
        }
        this.db = db;
    }
    executeSql(statement, params) {
        if (!this.db) {
            console.error('DatabaseService needs a SqliteObject to work. Have you initDatabase() ?');
        }
        return this.db.executeSql(statement, params);
    }
    createTable(entity) {
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
    checkTableOrCreate(entity) {
        const proto = Object.getPrototypeOf(entity);
        if (!proto[`isEntity`]) {
            console.error('Parameter is not an entity. Missing property `isEntity` in the prototype.');
        }
        if (!proto[`getTableName`]) {
            console.error('Parameter is not an entity. Missing method `getTableName` in the prototype.');
        }
        return new Promise((resolve, reject) => {
            const tableName = proto.getTableName();
            this.checkTableExistence(tableName)
                .then(value => {
                if (value) {
                    resolve(true);
                }
                else {
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
    checkTableExistence(tableName) {
        if (!this.db) {
            console.error('DatabaseService needs a SqliteObject to work. Have you initDatabase() ?');
        }
        const sql = 'SELECT * FROM ' + tableName;
        const promiseA = new Promise((resolve, reject) => {
            this.db.executeSql(sql)
                .then(value => resolve(!!(value)))
                .catch(result => {
                if (result.rows) {
                    resolve(true);
                }
                else {
                    reject(result);
                }
            });
        });
        // Création d'un timeout dans le cas ou la requête SELECT n'aboutit pas.
        const promiseB = new Promise((resolve) => {
            const wait = setTimeout(() => {
                clearTimeout(wait);
                resolve(false);
            }, 800);
        });
        return Promise.race([promiseA, promiseB]);
    }
};
DatabaseService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [])
], DatabaseService);
export { DatabaseService };
//# sourceMappingURL=database.service.js.map