import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalGranjaPage } from './modal-granja.page';

const routes: Routes = [
  {
    path: '',
    component: ModalGranjaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalGranjaPageRoutingModule {}
