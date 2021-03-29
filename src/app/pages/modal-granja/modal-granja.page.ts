import { Component, OnInit, NgModule, ViewChild, Directive } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgregarOTService } from '../../services/agregar-ot.service';
import { SqliteService } from '../../services/sqlite.service';


@Component({
  selector: 'app-modal-granja',
  templateUrl: './modal-granja.page.html',
  styleUrls: ['./modal-granja.page.scss'],
})


export class ModalGranjaPage implements OnInit {



  textoBuscar: string = "";
  // granja: any;
  granjaSql:any;

  lstGranja: any[] = [];
  // lstGranjaSql: any[] = [];
  constructor(
    private modalCtrl: ModalController,
    private otService: AgregarOTService,
    private sqlService:SqliteService
  ) { }



  ngOnInit() {
    // this.cargarGranjas();
    this.cargarGranjaSql();
  }

  cargarGranjaSql(){
    this.sqlService.selectCatGranja_Sql().then(res => {
      this.granjaSql = res;
      console.log('GRANJA 😎')
      console.log(this.granjaSql);

    });
  }
  cargarGranjas() {
    this.otService.cargarGranjaLista().then((granja: []) => {
      this.lstGranja = granja.concat();
      console.log(this.lstGranja)
    });
  }

  onSearchChange(event) {
    this.textoBuscar = event.detail.value;

  }

  onClick(granja) {
    // this.granja = this.albumes[i].title;

    this.modalCtrl.dismiss({
      Centro: granja.Centro,
      nombre: granja.Nombre
    })
  }


}
