import {Injectable} from '@angular/core';
import {DistributionLddEntity, TypeDistribution} from '../domain/distribution-ldd.entity';
import {AbstractRepository} from '../technical/orm/repository';
import {IndexeddbService} from '../technical/service/indexeddb.service';
import {DatabaseService} from '../technical/orm/database.service';

@Injectable({
    providedIn: 'root'
})
export class DistributionLddRepository extends AbstractRepository<DistributionLddEntity, number> {

    private INDEXEDDB_KEY_LDD = 'LDD';

    constructor(private databaseService: DatabaseService,
                private storage: IndexeddbService) {
        super(databaseService, DistributionLddEntity.prototype.constructor);
    }

    static formatDate(dat: number): string {
        const date: Date = new Date(dat);
        // tslint:disable-next-line:max-line-length
        return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    }

    getKeyFromEntity(distri: DistributionLddEntity): string {
        return this.INDEXEDDB_KEY_LDD + '-' + distri.codeBarre;
    }

    async getByCodeBarre(codeBarre: string): Promise<DistributionLddEntity> {
        return await this.storage.getLocalData(this.INDEXEDDB_KEY_LDD + '-' + codeBarre);
    }

    async search(field: string, value: any): Promise<DistributionLddEntity[]> {
        const lddReturned = [];
        const lddArray = await this.storage.getLocalData(this.INDEXEDDB_KEY_LDD);
        if (lddArray) {
            for (const ldd of lddArray) {
                if (ldd[field] === value) {
                    lddReturned.push(ldd);
                }
            }
        }
        return new Promise<DistributionLddEntity[]>(resolve => resolve(lddReturned));
    }

    async distribuer(distributionLdd: DistributionLddEntity): Promise<any> {
        distributionLdd.synced = 'N';
        distributionLdd.typeDistribution = TypeDistribution.DISTRIBUTION;
        distributionLdd.dateDistribution = DistributionLddRepository.formatDate(Date.now());
        // return this.repositoryService.save(distributionLdd);
        let lddArray = await this.storage.getLocalData(this.INDEXEDDB_KEY_LDD);
        if (lddArray) {
            lddArray.push(distributionLdd);
        } else {
            lddArray = [distributionLdd];
        }
        return this.storage.setLocalData(this.INDEXEDDB_KEY_LDD, lddArray)
            .then(value => this.storage.setLocalData(this.getKeyFromEntity(distributionLdd), distributionLdd));
    }
}
