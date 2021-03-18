import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarPageRoutingModule } from './agregar-routing.module';

import { AgregarPage } from './agregar.page';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';
import { ModalGranjaPageModule } from '../modal-granja/modal-granja.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AgregarPageRoutingModule,
    ComponentsModule,
    PipesModule,
    ModalGranjaPageModule
  ],
  declarations: [
    AgregarPage]
})
export class AgregarPageModule {}
