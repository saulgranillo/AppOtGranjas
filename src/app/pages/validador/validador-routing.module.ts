import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidadorPage } from './validador.page';

const routes: Routes = [
  {
    path: '',
    component: ValidadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidadorPageRoutingModule {}
