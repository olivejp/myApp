###Suivre les indications données sur cette page :

[https://dashboard.ionicframework.com/welcome?f=first-app&t=angular]
[https://ionicframework.com/docs/building/android]

###Problèmes rencontrés

####Une exception arrive avec la cause : @RequiresApi unknow alors installer les plugins :
        https://github.com/dpa99c/cordova-plugin-androidx-adapter
        https://github.com/dpa99c/cordova-plugin-androidx

####Problème de signature
L'erreur vient du fait qu'une précédente installation de l'application était présente sur le téléphone.
Cette précédente installation avait été compilé sur un autre poste.
Dans ce cas désinstaller d'abord l'application de votre téléphone avant de réinstaller.

####Licenses not accepted
Si le lancement bloque à cause d'un défaut de licences. Il faut appeler lancer la commande suivante :

    %ANDROID_SDK_HOME%\tools\bin\sdkmanager --licenses

Et accepter toutes les licenses qui ne l'auraient pas été.

Il existe peut être un second répertoire SDK à la racine utilisateur. Dans ce cas lancer également la commande suivante :
    c:\Users\nom_utilisateur\AppData\Local\Android\sdk\tools\bin\sdkmanager --licenses

## Lancer l'application
Pour lancer l'émulation sur un device taper la commande suivante :

    ionic cordova run android

Pour être dans le mode hot reload

    ionic cordova run android -l

####Installation du plugin de lecture de code barre
[https://ionicframework.com/docs/native/barcode-scanner]

Dans le readme du plugin il n'est pas mentionné qu'il faut rajouter le module dans app.module.ts

```angular2
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
