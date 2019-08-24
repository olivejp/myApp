import {DatabaseService} from '../../services/core/database.service';

export abstract class Repository {
    private databaseServiceSuper: DatabaseService;

    protected constructor(databaseService: DatabaseService) {
        this.databaseServiceSuper = databaseService;
    }

    createTable(entity: any): Promise<any> {
        return this.databaseServiceSuper.executeSql(Object.getPrototypeOf(entity).getCreateSql());
    }

    isTableExistsOrCreate(entity: any): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const tableName: string = Object.getPrototypeOf(entity).getTableName();
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
        const sqlInsertInto: string = proto.getSqlInsertInto(entity);
        return this.isTableExistsOrCreate(entity)
            .then(value => this.databaseServiceSuper.executeSql(sqlInsertInto))
            .catch(reason => console.log('Erreur lors de l\'insertion : ' + reason));
    }
}
