import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManualesPage } from './manuales.page';

const routes: Routes = [
  {
    path: '',
    component: ManualesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManualesPageRoutingModule {}
