import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { Annonce } from 'src/app/dto/annonce.dto';
let AnnonceComponent = class AnnonceComponent {
    constructor() { }
    ngOnInit() { }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Annonce)
], AnnonceComponent.prototype, "annonce", void 0);
AnnonceComponent = tslib_1.__decorate([
    Component({
        selector: 'app-annonce',
        templateUrl: './annonce.component.html',
        styleUrls: ['./annonce.component.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [])
], AnnonceComponent);
export { AnnonceComponent };
//# sourceMappingURL=annonce.component.js.map