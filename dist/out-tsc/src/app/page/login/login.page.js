import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
let LoginPage = class LoginPage {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() {
    }
    signIn() {
        console.log('Je suis authentifié !!!');
        this.auth = true;
        this.router.navigate(["/menu"]);
    }
};
LoginPage = tslib_1.__decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.page.html',
        styleUrls: ['./login.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [Router])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.page.js.map