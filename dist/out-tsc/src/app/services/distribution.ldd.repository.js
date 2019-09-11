import * as tslib_1 from "tslib";
var DistributionLddRepository_1;
import { Injectable } from '@angular/core';
import { DistributionLddEntity, TypeDistribution } from '../domain/distribution-ldd.entity';
import { AbstractRepository } from '../technical/orm/repository';
import { IndexeddbService } from '../technical/service/indexeddb.service';
import { DatabaseService } from '../technical/orm/database.service';
let DistributionLddRepository = DistributionLddRepository_1 = class DistributionLddRepository extends AbstractRepository {
    constructor(databaseService, storage) {
        super(databaseService, DistributionLddEntity.prototype.constructor);
        this.databaseService = databaseService;
        this.storage = storage;
        this.INDEXEDDB_KEY_LDD = 'LDD';
    }
    static formatDate(dat) {
        const date = new Date(dat);
        // tslint:disable-next-line:max-line-length
        return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    }
    getKeyFromEntity(distri) {
        return this.INDEXEDDB_KEY_LDD + '-' + distri.codeBarre;
    }
    getByCodeBarre(codeBarre) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.storage.getLocalData(this.INDEXEDDB_KEY_LDD + '-' + codeBarre);
        });
    }
    search(field, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const lddReturned = [];
            const lddArray = yield this.storage.getLocalData(this.INDEXEDDB_KEY_LDD);
            if (lddArray) {
                for (const ldd of lddArray) {
                    if (ldd[field] === value) {
                        lddReturned.push(ldd);
                    }
                }
            }
            return new Promise(resolve => resolve(lddReturned));
        });
    }
    distribuer(distributionLdd) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            distributionLdd.synced = 'N';
            distributionLdd.typeDistribution = TypeDistribution.DISTRIBUTION;
            distributionLdd.dateDistribution = DistributionLddRepository_1.formatDate(Date.now());
            // return this.repositoryService.save(distributionLdd);
            let lddArray = yield this.storage.getLocalData(this.INDEXEDDB_KEY_LDD);
            if (lddArray) {
                lddArray.push(distributionLdd);
            }
            else {
                lddArray = [distributionLdd];
            }
            return this.storage.setLocalData(this.INDEXEDDB_KEY_LDD, lddArray)
                .then(value => this.storage.setLocalData(this.getKeyFromEntity(distributionLdd), distributionLdd));
        });
    }
};
DistributionLddRepository = DistributionLddRepository_1 = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [DatabaseService,
        IndexeddbService])
], DistributionLddRepository);
export { DistributionLddRepository };
//# sourceMappingURL=distribution.ldd.repository.js.map