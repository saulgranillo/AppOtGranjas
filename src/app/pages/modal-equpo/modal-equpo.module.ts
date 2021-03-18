import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalEqupoPageRoutingModule } from './modal-equpo-routing.module';

import { ModalEqupoPage } from './modal-equpo.page';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalEqupoPageRoutingModule,
    PipesModule
  ],
  declarations: [ModalEqupoPage]
})
export class ModalEqupoPageModule {}
