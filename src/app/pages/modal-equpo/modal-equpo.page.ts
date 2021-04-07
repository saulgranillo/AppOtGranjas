import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { AgregarOTService } from '../../services/agregar-ot.service';
import { SqliteService } from '../../services/sqlite.service';

@Component({
  selector: 'app-modal-equpo',
  templateUrl: './modal-equpo.page.html',
  styleUrls: ['./modal-equpo.page.scss'],
})
export class ModalEqupoPage implements OnInit {

  textoBuscar: string = "";
  area : any;

  lstEquipo: any[] = [];
  // lstEquipoSql:any;
  
  constructor(private modalCtrl : ModalController, 
              private otService : AgregarOTService, 
              private sqlService:SqliteService,
              private platform : Platform) { }

  ngOnInit() {
    if (this.platform.is('cordova')) {
      this.cargarEquipoSql();
    }
    else{
      this.cargarEquipo();
    
    }
  }

  cargarEquipoSql(){
    this.sqlService.selectCatEquipo_Sql().then((res:[]) => {
      this.lstEquipo = res;
      console.log('EQUIPO 😎')
      console.log(this.lstEquipo);

    });
  }


  cargarEquipo() {

    this.otService.cargarEquipoLista().then((equipo: []) => {
      this.lstEquipo = equipo.concat();
      console.log(this.lstEquipo);
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
      Grupo: equipo.GpoEquipo
    })
  }


}
