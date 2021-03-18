import { Component, OnInit } from '@angular/core';
import { promise } from 'protractor';
import { AgregarOTService } from '../../services/agregar-ot.service';
import { SqliteService } from '../../services/sqlite.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  lstEquipo: any[] = [];
  lstPrioridad: any[] = [];
  lstTipo: any[] = [];
  lstArea: any[] = [];
  lstGranja: any[] = [];

  constructor(private otService: AgregarOTService, private sqlService : SqliteService) { }

  ngOnInit() {
  }
  ionViewDidEnter(){
  // this.sqlService.getData().then( res =>{
  //   console.log(res);
  // }) 
  }

  cargarEquipo() {

    this.otService.cargarEquipoLista().then((equipo: []) => {
      this.lstEquipo = equipo.concat();
      console.log(this.lstEquipo);

    });
  }

  cargarPrioridad() {
    this.otService.cargarPrioridadLista().then((prio:[]) =>{
      this.lstPrioridad = prio.concat();
      console.log(this.lstPrioridad)
    });
    
  }

  cargarTipo() {
    this.otService.cargarTipoLista().then((tipo:[]) =>{
      this.lstTipo = tipo.concat();
      console.log(this.lstTipo)
    });
  }

  cargarArea() {
    this.otService.cargarAreaLista().then((area:[]) =>{
      this.lstArea = area.concat();
      console.log(this.lstArea)
    });
  }

  cargarGranja() {
    this.otService.cargarGranjaLista().then((granja:[]) =>{
      this.lstGranja = granja.concat();
      console.log(this.lstGranja)
    });
  }

}
