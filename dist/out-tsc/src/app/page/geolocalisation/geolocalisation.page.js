import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { GeolocalService } from '../../services/geolocal.service';
let GeolocalisationPage = class GeolocalisationPage {
    constructor(geolocation) {
        this.geolocation = geolocation;
    }
    ngOnInit() {
        this.geolocation.getLocalisation().subscribe(position => {
            this.position = position;
            var date = new Date(position.timestamp);
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            var seconds = "0" + date.getSeconds();
            this.formatedDate = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        });
    }
    ngOnDestroy() {
    }
};
GeolocalisationPage = tslib_1.__decorate([
    Component({
        selector: 'app-geolocalisation',
        templateUrl: './geolocalisation.page.html',
        styleUrls: ['./geolocalisation.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [GeolocalService])
], GeolocalisationPage);
export { GeolocalisationPage };
//# sourceMappingURL=geolocalisation.page.js.map