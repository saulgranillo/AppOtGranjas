import { Component, OnInit } from '@angular/core';
import { AgregarOTService } from '../../services/agregar-ot.service';
import { SqliteService } from '../../services/sqlite.service';
import { interval, Subscription } from 'rxjs';
import { Platform, LoadingController } from '@ionic/angular';

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

  subscripcion: Subscription

  constructor(private otService: AgregarOTService, 
              private sqlService : SqliteService,
              private platform: Platform,
              private loadingCtrl : LoadingController
              ) { }

  ngOnInit() {
    // this.subscripcion = interval(10000).subscribe((x => {
    //   console.log('entre al timer');
    //   this.selecNoGuardada();
    // }));
   
  }
  

  ngAfterViewInit(){
    this.sqlService.crearDB();
  }

  
  ionViewDidEnter(){
  // this.sqlService.getData().then( res =>{
  //   console.log(res);
  // }) 
  
  }

  selecNoGuardada(){
    this.sqlService.selecNoGuardada().then(()=>{
      console.log("Alerta de guardado exitosamente")
    }).catch(()=>{
      console.log("alerta de error al guardar en srvr")
    });
  }
 
  excel(){
    this.sqlService.selectCatOT_Sql();
  }
// este es el caminito para todo por sqlite
  actualizarCat(){
    
    this.sqlService.insertarCatPrioridad_Sql().then(resp => {
      // console.log('resppp')
      console.log(resp);
    });
    
    this.sqlService.insertarCatTipo_Sql().then(resp => {
      // console.log('resppp')
      console.log(resp);
    });
    
    this.sqlService.insertarCatEst_Sql().then(resp => {
      // console.log('resppp')
      console.log(resp);
    });

    this.sqlService.insertarCatEvento_Sql().then(resp => {
      // console.log('resppp')
      console.log(resp);
    });

    this.sqlService.insertarCatArea_Sql().then(resp => {
      // console.log('resppp')
      console.log(resp);
    });

    this.sqlService.insertarCatGranja_Sql().then(resp => {
      // console.log('resppp')
      console.log(resp);
    });

    this.sqlService.insertarCatEquipo_Sql().then(resp => {
      // console.log('resppp')
      console.log(resp);
    });


this.presentLoading();
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Actualizando los datos',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
}
