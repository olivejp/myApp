import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {ScannerComponent} from './scanner/scanner.component';
import {SignatureComponent} from './signature/signature.component';
import {MenuPrincipalComponent} from './menu-principal/menu-principal.component';
import {RechercheLddComponent} from './recherche-ldd/recherche-ldd.component';

const routes: Routes = [
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
    path: 'scanner',
    component: ScannerComponent
  },
  {
    path: 'recherche-ldd',
    component: RechercheLddComponent
  },
  { path: 'login',    loadChildren: './login/login.module#LoginPageModule'  },
  { path: 'text-to-speech', loadChildren: './text-to-speech/text-to-speech.module#TextToSpeechPageModule' },  { path: 'geolocalisation', loadChildren: './geolocalisation/geolocalisation.module#GeolocalisationPageModule' }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
