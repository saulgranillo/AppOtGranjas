import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-tecnicos',
  templateUrl: './modal-tecnicos.page.html',
  styleUrls: ['./modal-tecnicos.page.scss'],
})
export class ModalTecnicosPage implements OnInit {

  tecnicos=[
    {
      id: 1,
      nombre: 'ACARRERA'
    },
    {
      id: 2,
      nombre: 'ACASTILLO'
    },
    {
      id: 3,
      nombre: 'ACASTRO'
    },
    {
      id: 4,
      nombre: 'AOVALLES'
    },
    {
      id: 5,
      nombre: 'AVILLALVAZO'
    }
  ]

  arrTecnicos: any[] = 
  [
    {
      nombre: 'ACARRERA'
    },
    {
      nombre: 'ACASTILLO'
    },
    {
      nombre: 'ACASTRO'
    },
    {
      nombre: 'AOVALLES'
    },
    {
      nombre:'ARIVERA'
    },
    {
      nombre:'ARODRIGUEZ'
    },
    {
      nombre:'BCEBALLOS'
    },
    {
      nombre:'BCHAVEZ'
    },
    {
      nombre:'DMENDOZA'
    },
    {
      nombre:'DSANTIAGO'
    },
    {
      nombre:'DVEGA'
    },
    {
      nombre:'EDOMINGUEZ'
    },
    {
      nombre:'EGUZMAN'
    },
    {
      nombre:'EXTERNO'
    },
    {
      nombre:'FCAMPAS'
    },
    {
      nombre:'FRAMIREZ'
    },
    {
      nombre:'FRIVERA'
    },
    {
      nombre:'FSANCHEZ'
    },
    {
      nombre:'FVEGA'
    },
    {
      nombre:'GBORBON'
    },
    {
      nombre:'GRAMIREZ'
    },
    {
      nombre:'HMENDIVIL'
    },
    {
      nombre:'IALVARES'
    },
    {
      nombre:'IFLORES'
    },
    {
      nombre:'JGONZALEZ'
    },
    {
      nombre:'JGRIJALVA'
    },
    {
      nombre:'JHERRERA'
    },
    {
      nombre:'JMARTINEZ'
    },
    {
      nombre:'JMENDIVIL'
    },
    {
      nombre:'JORDUÑO'
    },
    {
      nombre:'JPAREDES'
    },
    {
      nombre:'JVAZQUEZ'
    },
    {
      nombre:'LGUERRERO'
    },
    {
      nombre:'MAOCHOA'
    },
    {
      nombre:'MGARCIA'
    },
    {
      nombre:'MLEYVA'
    },
    {
      nombre:'MLOPEZ'
    },
    {
      nombre:'MNIEBLAS'
    },
    {
      nombre:'MOCHOA'
    },
    {
      nombre:'NRAMIREZ'
    },
    {
      nombre:'OBUSTAMANTE'
    },
    {
      nombre:'PAYALA'
    },
    {
      nombre:'PLEYVA'
    },
    {
      nombre:'PRODRIGUEZ'
    },
    {
      nombre:'RMORA'
    },
    {
      nombre:'SANAYA'
    },
    {
      nombre:'SGONZALEZ'
    },
    {
      nombre:'WGONZALEZ'
    }
  ]

  textoBuscar: string = "";
  tecnico : any;
pruebaDevelop: any;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  onSearchChange( event){
    this.textoBuscar = event.detail.value; 

  }

  onClick(tecnico){
    // console.log('tecnico seleccionado')
    // console.log(tecnico);
      this.modalCtrl.dismiss({
        id : tecnico.id,
        nombre : tecnico.nombre
      })
    }
  
}
