import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'agregar',
    loadChildren: () => import('./pages/agregar/agregar.module').then( m => m.AgregarPageModule)
  },
  {
    path: 'modal-area',
    loadChildren: () => import('./pages/modal-area/modal-area.module').then( m => m.ModalAreaPageModule)
  },
  {
    path: 'modal-tecnicos',
    loadChildren: () => import('./pages/modal-tecnicos/modal-tecnicos.module').then( m => m.ModalTecnicosPageModule)
  },
  {
    path: 'modal-equpo',
    loadChildren: () => import('./pages/modal-equpo/modal-equpo.module').then( m => m.ModalEqupoPageModule)
  },
  {
    path: 'validador',
    loadChildren: () => import('./pages/validador/validador.module').then( m => m.ValidadorPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'reportes',
    loadChildren: () => import('./pages/reportes/reportes.module').then( m => m.ReportesPageModule)
  },  {
    path: 'manuales',
    loadChildren: () => import('./pages/manuales/manuales.module').then( m => m.ManualesPageModule)
  },
  {
    path: 'reset-pass',
    loadChildren: () => import('./pages/reset-pass/reset-pass.module').then( m => m.ResetPassPageModule)
  }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
