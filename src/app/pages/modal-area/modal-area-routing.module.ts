import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalAreaPage } from './modal-area.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAreaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalAreaPageRoutingModule {}
