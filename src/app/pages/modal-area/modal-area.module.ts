import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAreaPageRoutingModule } from './modal-area-routing.module';

import { ModalAreaPage } from './modal-area.page';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalAreaPageRoutingModule,
    PipesModule
  ],
  declarations: [ModalAreaPage]
})
export class ModalAreaPageModule {}
