import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidadorPageRoutingModule } from './validador-routing.module';

import { ValidadorPage } from './validador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ValidadorPageRoutingModule
  ],
  declarations: [ValidadorPage]
})
export class ValidadorPageModule {}
