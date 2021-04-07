import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'inicio',
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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
