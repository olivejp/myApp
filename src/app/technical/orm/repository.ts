import {DatabaseService} from '../../services/core/database.service';

export abstract class Repository {
    private databaseServiceSuper: DatabaseService;
    private entityConstructor;

    protected constructor(databaseService: DatabaseService, entityConstructor: any) {
        this.databaseServiceSuper = databaseService;
        this.entityConstructor = entityConstructor;
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

    isTableExistsOrCreate(entity: any): Promise<boolean> {
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

    findById(id: any): Promise<any> {
        if (!id) {
            return new Promise<any>(resolve => null);
        }
        const entity = new this.entityConstructor();
        const proto = Object.getPrototypeOf(entity);
        let keyEntry;
        for (const entry of proto[`columns`].entries()) {
            if (entry[1].primary) {
                keyEntry = entry;
                break;
            }
        }
        return new Promise<any>((resolve, reject) => {
            this.databaseServiceSuper.executeSql('SELECT * FROM ' + proto.getTableName() + ' WHERE ' + keyEntry[1].name + ' = ' + id)
                .then(result => resolve(proto.mapSqlResultToEntity(entity, result.rows.item(0))))
                .catch(reject);
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
            this.isTableExistsOrCreate(entity)
                .then(value => {
                        if (value) {
                            this.databaseServiceSuper.executeSql(query)
                                .then(value1 => {
                                    proto.setId(entity, value1.insertId);
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
