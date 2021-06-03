import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroPipe } from './filtro.pipe';
import { FileSizePipe } from './file-size.pipe';



@NgModule({
  declarations:[
    FiltroPipe,
    FileSizePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FiltroPipe
  ]
})
export class PipesModule { }
