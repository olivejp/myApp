import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {FileImageService} from './services/core/file-image.service';
import {SQLite} from '@ionic-native/sqlite/ngx';
import {DB_LOCATION, DB_NAME} from './constant';
import {DatabaseService} from './technical/orm/database.service';

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
        private fileImageService: FileImageService,
        private databaseService: DatabaseService
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.splashScreen.show();
        this.platform.ready()
            .then(str => this.fileImageService.initializationImageDirectory())// Check that the image folder has been created or create it.
            .then(value => {
                return this.sqlite.create({ // Then check if the database has been created or create it.
                    name: DB_NAME,
                    location: DB_LOCATION
                })
                    .then(db => this.databaseService.initDatabase(db))
                    .catch(reason => console.error(reason));
            })
            .then(value => this.init())
            .catch(reason => console.error(reason));
    }

    init() {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
    }
}
