import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FileImageService } from './services/core/file-image.service';
import { SQLite } from '@ionic-native/sqlite/ngx';
import 'reflect-metadata';
import { createConnections } from 'typeorm';
let AppComponent = class AppComponent {
    constructor(sqlite, platform, splashScreen, statusBar, fileImageService) {
        this.sqlite = sqlite;
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.fileImageService = fileImageService;
        this.initializeApp();
    }
    initializeApp() {
        this.splashScreen.show();
        this.platform.ready()
            .then(str => this.fileImageService.initializationImageDirectory()) // Check that the image folder has been created or create it.
            .then(value => createConnections([{
                type: 'sqlite',
                database: 'sido_mobile'
            }]))
            .then(value => this.init())
            .catch(reason => console.error(reason));
    }
    init() {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
    }
};
AppComponent = tslib_1.__decorate([
    Component({
        selector: 'app-root',
        templateUrl: 'app.component.html',
        styleUrls: ['app.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [SQLite,
        Platform,
        SplashScreen,
        StatusBar,
        FileImageService])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map