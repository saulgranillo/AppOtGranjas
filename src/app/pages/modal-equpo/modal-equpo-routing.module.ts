import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalEqupoPage } from './modal-equpo.page';

const routes: Routes = [
  {
    path: '',
    component: ModalEqupoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalEqupoPageRoutingModule {}
