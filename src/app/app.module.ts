import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {File} from '@ionic-native/file/ngx';
import {NetworkService} from './services/network.service';
import {Network} from '@ionic-native/network/ngx';
import {SignaturePadModule} from 'angular4-signaturepad';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, SignaturePadModule],
    providers: [
        StatusBar,
        SplashScreen,
        BarcodeScanner,
        NetworkService,
        Network,
        File,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
