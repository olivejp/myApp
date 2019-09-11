import * as tslib_1 from "tslib";
export class AbstractRepository {
    constructor(databaseServiceSuper, entityConstructor) {
        this.databaseServiceSuper = databaseServiceSuper;
        this.entityConstructor = entityConstructor;
    }
    createTable(entity) {
        const proto = Object.getPrototypeOf(entity);
        if (!proto[`isEntity`]) {
            console.error('Parameter is not an entity. Missing property `isEntity` in the prototype.');
        }
        if (!proto[`getCreateSql`]) {
            console.error('Parameter is not an entity. Missing method `getCreateSql` in the prototype.');
        }
        return this.databaseServiceSuper.executeSql(proto.getCreateSql());
    }
    save(entity) {
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
        const query = (id) ? proto.getSqlUpdate(entity) : proto.getSqlInsertInto(entity);
        return new Promise((resolve, reject) => {
            this.databaseServiceSuper.checkTableOrCreate(entity)
                .then(exist => {
                if (exist) {
                    this.databaseServiceSuper.executeSql(query)
                        .then(queryResult => {
                        proto.setId(entity, queryResult.insertId);
                        resolve(entity);
                    })
                        .catch(reason => reject(reason));
                }
                else {
                    reject('Table doesn\'t exist');
                }
            })
                .catch(reason => {
                reject('Table doesn\'t exist and has not been created - ' + reason);
            });
        });
    }
    /**
     * Retournera l'entity si elle est trouvée, sinon null
     */
    findById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const entity = new this.entityConstructor();
            const proto = Object.getPrototypeOf(entity);
            if (!id) {
                return new Promise((resolve, reject) => reject('findById needs a ID'));
            }
            if ((yield this.databaseServiceSuper.checkTableExistence(proto.getTableName())) === false) {
                return new Promise((resolve, reject) => reject('Table ' + proto.getTableName() + ' doesn\'t exist'));
            }
            let keyEntry;
            for (const entry of proto[`columns`].entries()) {
                if (entry[1].primary) {
                    keyEntry = entry;
                    break;
                }
            }
            return new Promise((resolve, reject) => {
                this.databaseServiceSuper.executeSql('SELECT * FROM ' + proto.getTableName() + ' WHERE ' + keyEntry[1].name + ' = ' + id)
                    .then(result => {
                    if (result.rows.length > 0) {
                        resolve(proto.mapSqlResultToEntity(entity, result.rows.item(0)));
                    }
                    else {
                        resolve(null);
                    }
                })
                    .catch(reject);
            });
        });
    }
}
//# sourceMappingURL=repository.js.map