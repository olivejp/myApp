import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';
import {File} from '@ionic-native/file/ngx';
import {DB_NAME, IMAGE_FOLDER_NAME} from './constant';
import {DatabaseService} from './services/database.service';

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
        private sqlite: SQLite,
        private file: File,
        private databaseService: DatabaseService
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {

            // Check that the image folder has been created or create it.
            // Then check if the database has been created or create it.
            this.createImageDirectory()
                .then(this.createSqliteDatabase)
                .then(this.initDatabase)
                .then(value => {
                    if (value) {
                        this.init();
                    }
                })
                .catch(reason => console.error(reason));
        });
    }

    init() {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
    }

    initDatabase(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.databaseService.getDb()
                .executeSql('SELECT name FROM sqlite_master WHERE type=\'table\' AND name=\'sido_ldd\'')
                .then()
                .catch();
        });
    }

    checkTableExistence(db: SQLiteObject, tableName: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            db.executeSql('SELECT name FROM sqlite_master WHERE type=\'table\' AND name= ' + tableName )
                .then(v => resolve(true))
                .catch(reason => reject(reason));
        });
    }

    /**
     * Retournera true si la base a bien été créée ou lue, false sinon.
     */
    createSqliteDatabase(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.sqlite.create({
                name: DB_NAME,
                location: 'default'
            })
                .then(sqliteObject => this.databaseService.initSqliteObject(sqliteObject))
                .catch(reason => reject(reason));
        });
    }

    /**
     * Retournera true si le répertoire existe ou a bien été créé, false sinon.
     */
    createImageDirectory(): Promise<boolean> {
        const uriDirectory = this.file.dataDirectory;
        return new Promise<boolean>((resolve, reject) => {
            this.file.checkDir(uriDirectory, IMAGE_FOLDER_NAME)
                .then(value => resolve(true))
                .catch(reason => {
                    this.file.createDir(uriDirectory, IMAGE_FOLDER_NAME, false)
                        .then(value => resolve(true))
                        .catch(reason1 => reject(reason1));
                });
        });
    }
}
