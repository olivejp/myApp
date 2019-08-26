import {Injectable} from '@angular/core';
import {DatabaseService} from './core/database.service';
import {DistributionLddEntity, TypeDistribution} from '../domain/distribution-ldd.entity';
import {Repository} from '../technical/orm/repository';

@Injectable({
    providedIn: 'root'
})
export class DistributionLddRepository extends Repository {
    constructor(private databaseService: DatabaseService) {
        super(databaseService, DistributionLddEntity.prototype.constructor);
    }

    static formatDate(dat: number): string {
        const date: Date = new Date(dat);
        // tslint:disable-next-line:max-line-length
        return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    }

    distribuer(distributionLdd: DistributionLddEntity): Promise<any> {
        distributionLdd.typeDistribution = TypeDistribution.DISTRIBUTION;
        distributionLdd.dateDistribution = DistributionLddRepository.formatDate(Date.now());
        return this.save(distributionLdd);
    }
}
