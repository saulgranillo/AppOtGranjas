import { Component, OnInit, NgModule, ViewChild, Directive } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgregarOTService } from '../../services/agregar-ot.service';


@Component({
  selector: 'app-modal-granja',
  templateUrl: './modal-granja.page.html',
  styleUrls: ['./modal-granja.page.scss'],
})


export class ModalGranjaPage implements OnInit {



  textoBuscar: string = "";
  granja: any;

  lstGranja: any[] = [];
  constructor(
    private modalCtrl: ModalController,
    private otService: AgregarOTService
  ) { }



  ngOnInit() {
    this.cargarGranjas();
  }

  cargarGranjas() {
    this.otService.cargarGranjaLista().then((granja: []) => {
      this.lstGranja = granja.concat();
      // console.log(this.lstGranja)
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
