import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {FileImageService} from './services/core/file-image.service';
import {SQLite} from '@ionic-native/sqlite/ngx';
import {NextObserver} from 'rxjs';
import {IndexeddbService} from './technical/service/indexeddb.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {

    isConnected: NextObserver<boolean>;

    constructor(
        private sqlite: SQLite,
        private platform: Platform,
        private splashScreen: SplashScreen,
        private fileImageService: FileImageService,
        private storage: IndexeddbService
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.splashScreen.show();
        this.platform.ready()
            .then(value => this.fileImageService.initializationImageDirectory())
            .then(v => this.init())
            .catch(reason => console.error(reason));
    }

    init() {
        if (this.splashScreen) {
            this.splashScreen.hide();
        }
    }
}
