###Suivre les indications données sur cette page :

[https://dashboard.ionicframework.com/welcome?f=first-app&t=angular]
[https://ionicframework.com/docs/building/android]

###Problèmes rencontrés

####Une exception arrive avec la cause : @RequiresApi unknow alors installer les plugins :
        https://github.com/dpa99c/cordova-plugin-androidx-adapter
        https://github.com/dpa99c/cordova-plugin-androidx

####Problème de signature
* L'erreur vient du fait qu'une précédente installation de l'application était présente sur le téléphone.
Cette précédente installation avait été compilé sur un autre poste.
Dans ce cas désinstaller d'abord l'application de votre téléphone avant de réinstaller.

####Licenses not accepted
Si le lancement bloque à cause d'un défaut de licences. Il faut appeler lancer la commande suivante :

    %ANDROID_SDK_HOME%\tools\bin\sdkmanager --licenses

Et accepter toutes les licenses qui ne l'auraient pas été.

Il existe peut être un second répertoire SDK à la racine utilisateur. Dans ce cas lancer également la commande suivante :
    c:\Users\nom_utilisateur\AppData\Local\Android\sdk\tools\bin\sdkmanager --licenses

####Problème de lancement de l'application

* Installer les plugins
    * Après avoir récupérer le projet sur un nouveau poste, cordova refusera de se lancer l'application si vous n'avez pas
installer tous les plugins avec npm.

* Ne pas lancer l'application depuis IntelliJ 2019.1
    * Il y a un bug sur IntelliJ 2019.1 qui va récupérer l'openJdk fourni avec IntelliJ au lieu de prendre celui passé par JAVA_HOME.
    Cela pose des soucis lors du lancement de ionic par le terminal d'IntelliJ.
    Ionic a besoin d'une version de JAVA en 1.8. Dans ce cas, ne passer pas par le terminal mais directement par un terminal externe (Cmder) 
 

## Lancer l'application
Pour lancer l'émulation sur un device taper la commande suivante :

    ionic cordova run android

Pour être dans le mode hot reload

    ionic cordova run android -l

Pour servir l'application sur le web (se rendre ensuite sur un navigateur et aller sur le localhost:8100)
    
    ionic serve

####Installation du plugin de lecture de code barre
[https://ionicframework.com/docs/native/barcode-scanner]

Dans le readme du plugin il n'est pas mentionné qu'il faut rajouter le module dans app.module.ts

```javascript
    import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
    
    @NgModule({
      declarations: [AppComponent],
      entryComponents: [],
      imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
      providers: [
        StatusBar,
        SplashScreen,
        BarcodeScanner,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
      ],
      bootstrap: [AppComponent]
    })
    export class AppModule {}
```

####Installation du plugin Signature
Trouvé sur le net, ce composant angular qui permet de capturer un dessin :
[https://www.youtube.com/watch?v=VXcdI_grUAA]

Installation du composant suivant :

    npm install angular2-signaturepad --save
    
Ajout du composant dans le app.module.ts

```javascript
    import {SignaturePadModule} from 'angular4-signaturepad';
    
    @NgModule({
        declarations: [AppComponent],
        entryComponents: [],
        imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, SignaturePadModule],
````

Insertion du composant dans la vue HTML

```html
    <signature-pad [options]="signaturePadOptions" (onBeginEvent)="drawStart()" (onEndEvent)="drawComplete()"></signature-pad>
```

Création des variables et méthodes nécessaires coté TypeScript

```javascript
import {SignaturePad} from 'angular4-signaturepad/signature-pad';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {

    @ViewChild(SignaturePad, null) signaturePad: SignaturePad;

    private downloadLink: string;

    private signaturePadOptions: object = {
        minWidth: 5,
        canvasWidth: 500,
        canvasHeight: 300
    };

    ...

    drawComplete() {
        // will be notified of szimek/signature_pad's onEnd event
        this.downloadLink = this.signaturePad.toDataURL();
    }

    drawStart() {
        // will be notified of szimek/signature_pad's onBegin event
        console.log('begin drawing');
    }
}
```

####Installation du plugin File pour pouvoir enregistrer une image sur le téléphone

Documentation pour l'installation : [https://ionicframework.com/docs/native/file#installation]

Documentation pour l'API : [https://ionicframework.com/docs/v3/native/file/]

Exemple d'utilisation
```javascript
    /** Voici comment créer un nouveau répertoire.
    * Dans notre cas nous utilisons le répertoire racine 'dataDirectory' mais plusieurs autres sont disponibles
    * notamment si on veut utiliser le storage externe comme la SD card du téléphone. voir : https://github.com/apache/cordova-plugin-file
    */
    private createDirectory(imageFolder: string, replace: boolean) {
        this.file.createDir(this.file.dataDirectory, imageFolder, replace)
            .then(directoryEntry => console.log('Création réuissie : ' + directoryEntry.fullPath))
            .catch(reason => console.log('Erreur lors de la création du dossier : ' + reason));
    }

    /**
     * Fonction permettant la récupération d'un répertoire. Là encore on suppose que le répertoire racine est 'dataDirectory'
     */
    private async getDirectory(imageFolder: string): Promise<DirectoryEntry> {
        return await this.file.resolveDirectoryUrl(this.file.dataDirectory.concat(imageFolder));
    }

    /**
     * Permet de sauver un fichier
     */
    async saveFile(fileName: string, fileToSave: any, folderName: string, opts?: IWriteOptions, dir?: DirectoryEntry): Promise<any> {
        opts = (opts) ? opts : {replace: true};
        dir = (dir) ? dir : await this.getDirectory(folderName);
        const directoryPath = dir.toURL();
        const blob = await (await fetch(fileToSave)).blob();
        return this.file.writeFile(directoryPath, fileName, blob, opts);
    }
```

####Installation du plugin SQLite pour pouvoir faire persister des données sur le téléphone

Documentation pour l'installation : [https://ionicframework.com/docs/v3/native/sqlite/]


###Debugging
####Sur un device :
    Aller sur chrome et aller sur l'adresse chrome://inspect/#devices
    Vous devriez retrouver le device connecté au poste, faites alors 'inspect' pour accéder à la console de l'application.


##Formation
##Création d'un keystore à partir d'Android Studio

keystore path = C:\Users\ecole1\sido-mobile-keystore.jks
password = password
alias = sido-mobile-keystore
password de la clé = mobile-keystore

--Signer une application
---Dans le play store, je n'ai pas accepté que Google gère la clé. Je vais la gérer moi même.
---Trouvé le tuto suivant : https://ionicframework.com/docs/v1/guide/publishing.html
---Je lance la commande suivante pour pouvoir générer une apk non signé

====> ionic cordova build android --prod --release --keystore=sido-mobile-keystore.jks --alias=sido-mobile-keystore

Cela va générer un apk non signé.

Pour le signer je fais le code suivant :
====>'C:\Program Files\Java\jdk1.8.0_181\bin\jarsigner' -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore sido-mobile-keystore.jks .\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk sido-mobile-keystore

Je dois ensuite faire le zipalign
====>C:\Users\ecole1\AppData\Local\Android\Sdk\build-tools\29.0.2\zipalign -v 4 app-release-unsigned.apk jp-mobile.apk

Pour connaitre le contenu d'une APK et voir le package utilisé ainsi que le numéro de version :
*** aapt est fourni dans ANDROID_HOME/sdk/build-tools/**.*.*/aapt

````shell script
aapt dump badging nom_apk.apk
````

Pour un attribut particulier

````shell script
aapt dump badging nom_apk.apk | grep 'pack'
````

Script pour déployer
https://www.brightec.co.uk/ideas/google-playstore-and-automated-deployment