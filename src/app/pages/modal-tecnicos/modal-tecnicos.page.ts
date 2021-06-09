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
      nombre: 'ALVAREZ ISMAEL'
    },
    {
      nombre: 'ARREDONDO ELADIO'
    },
    {
      nombre: 'BAIPOLI BALTAZAR'
    },
    {
      nombre: 'BUSTAMANTE VAZQUEZ OSCAR'
    },
    {
      nombre: 'BUSTAMANTE GUTIERREZ OSCAR'
    },
    {
      nombre: 'CAMPAS FRANCISCO'
    },
    {
      nombre:'CARRERA ANGEL'
    },
    {
      nombre:'CASTILLO ABEL'
    },
    {
      nombre:'CASTRO ALAN'
    },
    {
      nombre:'CEBALLOS BENITO'
    },
    {
      nombre:'DE SANTIAGO DOMINGO'
    },
    {
      nombre:'DOMINGUEZ ESTEBAN'
    },
    {
      nombre:'FLORES ISRAEL'
    },
    {
      nombre:'GONZALEZ FRANCISCO'
    },
    {
      nombre:'GONZALEZ JOHAN'
    },
    {
      nombre:'GONZALEZ SERVANDO'
    },
    {
      nombre:'GRIJALVA JUAN'
    },
    {
      nombre:'GRIJALVA FRANCISCO'
    },
    {
      nombre:'GUERRERO LUIS'
    },
    {
      nombre:'GUZMAN EUGENIO'
    },
    {
      nombre:'HERRERA JESUS'
    },
    {
      nombre:'LEYVA MARTIN'
    },
    {
      nombre:'LOPEZ CRUZ'
    },
    {
      nombre:'LOPEZ MELQUIADES'
    },
    {
      nombre:'MARTINEZ JOSE'
    },
    {
      nombre:'MENDIVIL EDGAR'
    },
    {
      nombre:'MENDIVIL HORACIO'
    },
    {
      nombre:'MENDOZA JESUS'
    },
    {
      nombre:'MORA RICARDO'
    },
    {
      nombre:'NIEBLA MARIO'
    },
    {
      nombre:'OCHOA MARCOS'
    },
    {
      nombre:'OCHOA MANUEL'
    },
    {
      nombre:'OVALLES CANDELARIO'
    },
    {
      nombre:'QUINTANA JESUS'
    },
    {
      nombre:'RAMIREZ FRANCISCO'
    },
    {
      nombre:'RAMIREZ GUADALUPE'
    },
    {
      nombre:'RAMIREZ NABOR'
    },
    {
      nombre:'RIVERA FRANCISCO'
    },
    {
      nombre:'RIVERA JESUS'
    },
    {
      nombre:'RODRIGUEZ PEDRO'
    },
    {
      nombre:'RODRIGUEZ FRANCISCO'
    },
    {
      nombre:'RODRIGUEZ ALBERTO'
    },
    {
      nombre:'VALENZUELA PAZ'
    },
    {
      nombre:'VAZQUEZ JOSE'
    },
    {
      nombre:'VEGA DIEGO'
    },
    {
      nombre:'VEGA JOSE'
    },
    {
      nombre:'VILLALVAZO ALDO'
    },
    {
      nombre:'YOVICHA JUSTO'
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
    console.log(tecnico);
      this.modalCtrl.dismiss({
        // id : tecnico.id,
        nombre : tecnico.nombre
      })
    }
  
}
