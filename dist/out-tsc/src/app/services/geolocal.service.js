import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { interval, from } from 'rxjs';
import { flatMap } from 'rxjs/operators';
let GeolocalService = class GeolocalService {
    constructor(geolocation) {
        this.geolocation = geolocation;
    }
    getLocalisation() {
        return interval(3000).pipe(flatMap(() => from(this.geolocation.getCurrentPosition())));
    }
};
GeolocalService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Geolocation])
], GeolocalService);
export { GeolocalService };
//# sourceMappingURL=geolocal.service.js.map