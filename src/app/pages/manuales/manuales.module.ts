import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManualesPageRoutingModule } from './manuales-routing.module';

import { ManualesPage } from './manuales.page';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManualesPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [ManualesPage]
})
export class ManualesPageModule {}
