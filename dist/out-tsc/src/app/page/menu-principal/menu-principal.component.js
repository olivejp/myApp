import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
let MenuPrincipalComponent = class MenuPrincipalComponent {
    constructor(actionSheetController, barcodeScanner, router, toastController, http) {
        this.actionSheetController = actionSheetController;
        this.barcodeScanner = barcodeScanner;
        this.router = router;
        this.toastController = toastController;
        this.http = http;
    }
    ngOnInit() {
    }
    lancerCapture() {
        this.barcodeScanner.scan().then(barcodeData => {
            console.log('Barcode data', barcodeData);
            this.router.navigate(['/signature', { codeBarre: barcodeData.text }]);
        }).catch(err => {
            console.log('Error', err);
        });
    }
    playToast(text) {
        this.toastController.create({
            message: text,
            duration: 3000
        }).then(toast => toast.present());
    }
    playActionSheet() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const actionSheet = yield this.actionSheetController.create({
                header: 'Albums',
                buttons: [{
                        text: 'Delete',
                        role: 'destructive',
                        icon: 'trash',
                        handler: () => this.playToast('Delete')
                    }, {
                        text: 'Share',
                        icon: 'share',
                        handler: () => this.playToast('Share')
                    }, {
                        text: 'Play (open modal)',
                        icon: 'arrow-dropright-circle',
                        handler: () => this.playToast('Play')
                    }, {
                        text: 'Favorite',
                        icon: 'heart',
                        handler: () => this.playToast('Favorite')
                    }, {
                        text: 'Cancel',
                        icon: 'close',
                        role: 'cancel',
                        handler: () => this.playToast('Cancel')
                    }]
            });
            yield actionSheet.present();
        });
    }
    appelWs() {
        this.http.get('https://oliweb-ec245.firebaseio.com/annonces.json').subscribe(annonces => {
            this.annonces = Object.keys(annonces).map(key => annonces[key]);
            console.log(this.annonces);
        });
    }
};
MenuPrincipalComponent = tslib_1.__decorate([
    Component({
        selector: 'app-menu-principal',
        templateUrl: './menu-principal.component.html',
        styleUrls: ['./menu-principal.component.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [ActionSheetController,
        BarcodeScanner,
        Router,
        ToastController,
        HttpClient])
], MenuPrincipalComponent);
export { MenuPrincipalComponent };
//# sourceMappingURL=menu-principal.component.js.map