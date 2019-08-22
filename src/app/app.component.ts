import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {DatabaseService} from './services/core/database.service';
import {FileImageService} from './services/core/file-image.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private fileImageService: FileImageService,
        private databaseService: DatabaseService
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.splashScreen.show();
        this.platform.ready()
            .then(str => this.fileImageService.initializationImageDirectory())// Check that the image folder has been created or create it.
            .then(value => this.databaseService.getOrInitDB())// Then check if the database has been created or create it.
            .then(value => this.init())
            .catch(reason => console.error(reason));
    }

    init() {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
    }
}
