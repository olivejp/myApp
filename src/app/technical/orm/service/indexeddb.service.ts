import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {INDEXEDDB_KEY} from '../../../constant';

@Injectable({
    providedIn: 'root'
})
export class IndexeddbService {
    private storage: Storage;

    constructor(storage: Storage) {
        this.storage = storage;
    }

    getLocalData(key): Promise<any> {
        return this.storage.get(`${INDEXEDDB_KEY}-${key}`);
    }

    setLocalData(key, data): Promise<any> {
        return this.storage.get(`${INDEXEDDB_KEY}-${key}`).then(storedData => {
            if (!Array.isArray(data)) {
                if (storedData) {
                    storedData.push(data);
                } else {
                    storedData = [data];
                }
            } else {
                storedData = data;
            }
            return this.storage.set(`${INDEXEDDB_KEY}-${key}`, storedData);
        });
    }
}
