import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { SignatureComponent } from './page/signature/signature.component';
import { MenuPrincipalComponent } from './page/menu-principal/menu-principal.component';
import { RechercheLddComponent } from './page/recherche-ldd/recherche-ldd.component';
const routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
        // component: MenuPrincipalComponent
        // loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {
        path: 'menu',
        component: MenuPrincipalComponent
    },
    {
        path: 'signature',
        component: SignatureComponent
    },
    {
        path: 'recherche-ldd',
        component: RechercheLddComponent
    },
    { path: 'login', loadChildren: './page/login/login.module#LoginPageModule' },
    { path: 'text-to-speech', loadChildren: './page/text-to-speech/text-to-speech.module#TextToSpeechPageModule' },
    { path: 'geolocalisation', loadChildren: './page/geolocalisation/geolocalisation.module#GeolocalisationPageModule' }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [
            RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
        ],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map