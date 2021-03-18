import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalGranjaPageRoutingModule } from './modal-granja-routing.module';

import { ModalGranjaPage } from './modal-granja.page';
import {PipesModule} from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalGranjaPageRoutingModule,
    PipesModule,
    ComponentsModule
  ],
  declarations: [ModalGranjaPage]
})
export class ModalGranjaPageModule {}
