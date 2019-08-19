import {Injectable} from '@angular/core';
import {SQLiteObject} from '@ionic-native/sqlite';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    private sqliteObject: SQLiteObject;

    constructor() {
    }

    initSqliteObject(db: SQLiteObject): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            if (!db) {
                reject('L\'objet SQLiteObject est null ou undefined.');
            } else {
                this.sqliteObject = db;
                resolve(true);
            }
        });
    }

    getDb(): SQLiteObject {
        return this.sqliteObject;
    }
}
