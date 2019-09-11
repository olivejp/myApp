import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { INDEXEDDB_KEY } from '../../constant';
let IndexeddbService = class IndexeddbService {
    constructor(storage) {
        this.storage = storage;
    }
    getLocalData(key) {
        return this.storage.get(`${INDEXEDDB_KEY}-${key}`);
    }
    setLocalData(key, data) {
        return this.storage.get(`${INDEXEDDB_KEY}-${key}`).then(storedData => {
            if (!Array.isArray(data)) {
                if (storedData) {
                    storedData.push(data);
                }
                else {
                    storedData = [data];
                }
            }
            else {
                storedData = data;
            }
            return this.storage.set(`${INDEXEDDB_KEY}-${key}`, storedData);
        });
    }
};
IndexeddbService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Storage])
], IndexeddbService);
export { IndexeddbService };
//# sourceMappingURL=indexeddb.service.js.map