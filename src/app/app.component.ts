import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {FileImageService} from './services/core/file-image.service';
import {SQLite} from '@ionic-native/sqlite/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private sqlite: SQLite,
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private fileImageService: FileImageService
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.splashScreen.show();
        this.platform.ready()
            .then(str => this.fileImageService.initializationImageDirectory())// Check that the image folder has been created or create it.
            .then(value => this.init())
            .catch(reason => console.error(reason));
    }

    init() {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
    }
}
