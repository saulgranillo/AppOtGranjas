import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgregarOTService } from '../../services/agregar-ot.service';

@Component({
  selector: 'app-modal-area',
  templateUrl: './modal-area.page.html',
  styleUrls: ['./modal-area.page.scss'],
})
export class ModalAreaPage implements OnInit {

  

  textoBuscar: string = "";
  area : any;

  lstArea: any[] = [];

  constructor( private modalCtrl: ModalController, private otService : AgregarOTService) { }

  ngOnInit() {
    this.cargarArea();
  }

  cargarArea() {
    this.otService.cargarAreaLista().then((area:[]) =>{
      this.lstArea = area.concat();
      // console.log(this.lstArea)
    });
  }


  onSearchChange( event){
    this.textoBuscar = event.detail.value; 

  }

  onClick(area){
  // console.log('area seleccionado')
  // console.log(area);
    this.modalCtrl.dismiss({
      Area : area.Area,
      AreaDesc : area.AreaDesc
    })
  }

}
