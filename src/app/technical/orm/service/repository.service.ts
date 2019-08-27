import {DatabaseService} from '../../../services/core/database.service';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RepositoryService {
    private databaseServiceSuper: DatabaseService;

    constructor(databaseService: DatabaseService) {
        this.databaseServiceSuper = databaseService;
    }

    createTable(entity: any): Promise<any> {
        const proto = Object.getPrototypeOf(entity);
        if (!proto[`isEntity`]) {
            console.error('Parameter is not an entity. Missing property `isEntity` in the prototype.');
        }
        if (!proto[`getCreateSql`]) {
            console.error('Parameter is not an entity. Missing method `getCreateSql` in the prototype.');
        }
        return this.databaseServiceSuper.executeSql(proto.getCreateSql());
    }

    checkTableExistence(entity: any): Promise<boolean> {
        const proto = Object.getPrototypeOf(entity);
        if (!proto[`isEntity`]) {
            console.error('Parameter is not an entity. Missing property `isEntity` in the prototype.');
        }
        if (!proto[`getTableName`]) {
            console.error('Parameter is not an entity. Missing method `getTableName` in the prototype.');
        }

        return new Promise<boolean>((resolve, reject) => {
            const tableName: string = proto.getTableName();
            this.databaseServiceSuper.checkTableExistence(tableName)
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

    save(entity: any): Promise<any> {
        const proto = Object.getPrototypeOf(entity);
        if (!proto[`isEntity`]) {
            console.error('Parameter is not an entity. Missing property `isEntity` in the prototype.');
        }
        if (!proto[`getSqlInsertInto`]) {
            console.error('Parameter is not an entity. Missing method `getSqlInsertInto` in the prototype.');
        }
        if (!proto[`getSqlUpdate`]) {
            console.error('Parameter is not an entity. Missing method `getSqlUpdate` in the prototype.');
        }
        if (!proto[`getId`]) {
            console.error('Parameter is not an entity. Missing method `getId` in the prototype.');
        }
        const id = proto.getId(entity);
        let query;
        if (id) {
            query = proto.getSqlUpdate(entity);
        } else {
            query = proto.getSqlInsertInto(entity);
        }

        return new Promise<any>((resolve, reject) => {
            this.checkTableExistence(entity)
                .then(value => {
                        if (value) {
                            this.databaseServiceSuper.executeSql(query)
                                .then(queryResult => {
                                    proto.setId(entity, queryResult.insertId);
                                    resolve(entity);
                                })
                                .catch(reason => reject(reason));
                        }
                    }
                )
                .catch(reason => {
                    reject('Table doesn\'t exist and has not been created - ' + reason);
                });
        });
    }
}
