import {DatabaseService} from '../../services/core/database.service';

export abstract class Repository<T, I> {
    private databaseServiceSuper: DatabaseService;
    private readonly entityConstructor;

    protected constructor(databaseService: DatabaseService, entityConstructor: any) {
        this.databaseServiceSuper = databaseService;
        this.entityConstructor = entityConstructor;
    }

    /**
     * Retournera l'entity si elle est trouvée, sinon null
     */
    async findById(id: I): Promise<T> {
        const entity = new this.entityConstructor();
        const proto = Object.getPrototypeOf(entity);

        if (!id) {
            return new Promise<T>((resolve, reject) => reject('findById needs a ID'));
        }
        if (await this.databaseServiceSuper.checkTableExistence(proto.getTableName()) === false) {
            return new Promise<T>((resolve, reject) => reject('Table ' + proto.getTableName() + ' doesn\'t exist'));
        }

        let keyEntry;
        for (const entry of proto[`columns`].entries()) {
            if (entry[1].primary) {
                keyEntry = entry;
                break;
            }
        }
        return new Promise<T>((resolve, reject) => {
            this.databaseServiceSuper.executeSql('SELECT * FROM ' + proto.getTableName() + ' WHERE ' + keyEntry[1].name + ' = ' + id)
                .then(result => {
                    if (result.rows.length > 0) {
                        resolve(proto.mapSqlResultToEntity(entity, result.rows.item(0)));
                    } else {
                        resolve(null);
                    }
                })
                .catch(reject);
        });
    }
}
