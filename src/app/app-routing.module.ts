import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {ScannerComponent} from './scanner/scanner.component';
import {SignatureComponent} from './signature/signature.component';
import {MenuPrincipalComponent} from './menu-principal/menu-principal.component';

const routes: Routes = [
  {
    path: '',
    component: MenuPrincipalComponent
    // loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'signature',
    component: SignatureComponent
  },
  {
    path: 'scanner',
    component: ScannerComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
