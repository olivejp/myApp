import {Injectable} from '@angular/core';
import {DatabaseService} from './core/database.service';
import {DistributionLddEntity, Repository} from '../domain/distribution-ldd.entity';

@Injectable({
    providedIn: 'root'
})
export class DistributionLddService extends Repository<DistributionLddEntity> {
    constructor(private databaseService: DatabaseService) {
        super(databaseService);
    }

    isTableExistsOrCreate(): Promise<boolean> {
        const distributionSample = new DistributionLddEntity();
        return new Promise<boolean>((resolve, reject) => {
            this.databaseService.checkTableExistence(distributionSample.getTableName())
                .then(value => {
                    if (value) {
                        resolve(true);
                    } else {
                        this.createTable(distributionSample)
                            .then(value1 => resolve(true))
                            .catch(reason => reject(reason));
                    }
                })
                .catch(reason => reject(reason));
        });
    }

    distribuer(distributionLdd: DistributionLddEntity): Promise<any> {
        return this.isTableExistsOrCreate()
            .then(value => {
                const sql = distributionLdd.getSqlInsertInto();
                console.log(sql);
                return this.databaseService.executeSql(sql);
            })
            .catch(reason => console.log('Erreur lors de l\'insertion : ' + reason));
    }
}
