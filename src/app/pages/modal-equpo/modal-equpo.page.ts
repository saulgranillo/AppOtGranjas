import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgregarOTService } from '../../services/agregar-ot.service';

@Component({
  selector: 'app-modal-equpo',
  templateUrl: './modal-equpo.page.html',
  styleUrls: ['./modal-equpo.page.scss'],
})
export class ModalEqupoPage implements OnInit {

  textoBuscar: string = "";
  area : any;

  lstEquipo: any[] = [];

  constructor(private modalCtrl : ModalController, private otService : AgregarOTService) { }

  ngOnInit() {
    this.cargarEquipo();
  }

  cargarEquipo() {

    this.otService.cargarEquipoLista().then((equipo: []) => {
      this.lstEquipo = equipo.concat();
      // console.log(this.lstEquipo);
    });
  }

  
  onSearchChange(event) {
    this.textoBuscar = event.detail.value;

  }

  onClick(equipo) {
   
    // console.log('equipo');
    // console.log(equipo)

    this.modalCtrl.dismiss({
      IdEquipo: equipo.IdEquipo,
      Descripcion: equipo.Descripcion,
      Codigo: equipo.Codigo,
      Grupo: equipo.Grupo
    })
  }


}
