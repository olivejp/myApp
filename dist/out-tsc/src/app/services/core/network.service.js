import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
let NetworkService = class NetworkService {
    constructor(network) {
        this.network = network;
    }
    subscribeToDisconnection() {
        return this.network.onDisconnect();
    }
    subscribeToConnection() {
        return this.network.onConnect();
    }
    subscribeOnChange() {
        return this.network.onchange();
    }
};
NetworkService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Network])
], NetworkService);
export { NetworkService };
//# sourceMappingURL=network.service.js.map