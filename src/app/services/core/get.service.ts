import {combineLatest, from, Observable, of, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {flatMap, map, share} from 'rxjs/operators';
import {NetworkService} from './network.service';
import {IndexeddbService} from '../../technical/service/indexeddb.service';

export abstract class GetService<T> {

    abstract resourceUrl: string;
    abstract indexKey: string;

    protected constructor(private httpSuper: HttpClient,
                          private networdkServiceSuper: NetworkService,
                          private storageSuper: IndexeddbService
    ) {
    }

    get(): Observable<T> {
        const isConnected$ = this.networdkServiceSuper.isConnected();
        const dataStored$ = from(this.storageSuper.getLocalData(this.indexKey));

        return combineLatest([isConnected$, dataStored$])
            .pipe(flatMap((values => {
                const isConnected = values[0];
                const dataStored = values[1];
                if (isConnected) {
                    return this.getHttp();
                } else {
                    if (dataStored) {
                        return of(dataStored);
                    } else {
                        return throwError('Aucune mesure en base et aucune connexion pour les récupérer.');
                    }
                }
            })));
    }

    private getHttp(): Observable<any> {
        return this.httpSuper.get(this.resourceUrl, {observe: 'response'})
            .pipe(
                map(response => {
                    if (response.ok) {
                        const result = response.body;
                        this.storageSuper.setLocalData(this.indexKey, result);
                        return result;
                    } else {
                        return 'Request failed.';
                    }
                }),
                share()
            );
    }
}
