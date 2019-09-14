import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {IonicModule, IonicRouteStrategy, ToastController} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {File} from '@ionic-native/file/ngx';
import {NetworkService} from './services/core/network.service';
import {Network} from '@ionic-native/network/ngx';
import {SignaturePadModule} from 'angular4-signaturepad';
import {SignatureComponent} from './page/signature/signature.component';
import {MenuPrincipalComponent} from './page/menu-principal/menu-principal.component';
import {SQLite} from '@ionic-native/sqlite/ngx';
import {FileImageService} from './services/core/file-image.service';
import {FormsModule} from '@angular/forms';
import {RechercheLddComponent} from './page/recherche-ldd/recherche-ldd.component';
import {IonicStorageModule} from '@ionic/storage';
import {INDEXEDDB_KEY, INDEXEDDB_NAME} from './constant';
import {IndexeddbService} from './technical/service/indexeddb.service';
import {GeolocalService} from './services/geolocal.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {HttpClientModule} from '@angular/common/http';
import {AnnonceComponent} from './annonce/annonce.component';
import {HttpService} from './services/core/http.service';
import {SidoToolbarComponent} from './sido-toolbar/sido-toolbar.component';
import {MesureService} from './services/core/mesure.service';
import {MotifService} from './services/core/motif.service';

@NgModule({
    declarations: [AppComponent, SignatureComponent, MenuPrincipalComponent, RechercheLddComponent, AnnonceComponent, SidoToolbarComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot({
            storeName: INDEXEDDB_NAME,
            dbKey: INDEXEDDB_KEY,
            driverOrder: ['indexeddb']
        }),
        AppRoutingModule,
        SignaturePadModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        BarcodeScanner,
        NetworkService,
        Network,
        SQLite,
        File,
        FileImageService,
        IndexeddbService,
        ToastController,
        GeolocalService,
        Geolocation,
        HttpService,
        MesureService,
        MotifService,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
