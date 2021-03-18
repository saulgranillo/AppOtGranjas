import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalTecnicosPageRoutingModule } from './modal-tecnicos-routing.module';

import { ModalTecnicosPage } from './modal-tecnicos.page';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalTecnicosPageRoutingModule,
    PipesModule
  ],
  declarations: [ModalTecnicosPage]
})
export class ModalTecnicosPageModule {}
