import { Component, OnInit } from '@angular/core';
import { SqliteService } from '../../services/sqlite.service';
import { Subscription } from 'rxjs';
import { Platform, LoadingController, AlertController, ModalController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { LoginPage } from '../login/login.page';
import { Router } from '@angular/router';

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
  lstCSV: any[] = [];
  header:any []=[];
  subscripcion: Subscription

  csvData : any[] = [];
  headerRow: any[] = [];
  otro : any[] = [];
  constructor(
              private sqlService : SqliteService,
              private platform: Platform,
              private loadingCtrl : LoadingController,                          
              private network: Network,
              private alertCtrl : AlertController
              ,private modalCtrl : ModalController
              ,private routes : Router      
              ) { }

  ngOnInit() {
    // this.subscripcion = interval(10000).subscribe((x => {
    //   console.log('entre al timer');
    //   this.selecNoGuardada();

    // }));

    // this.modalLogin();
    // this.routes.config.pop();
    console.log('RUTAS😎',this.routes)
    this.routes.config[0].redirectTo ="inicio"
    // this.routes.config[0].redirectTo
  }
  

  ngAfterViewInit(){
    if (this.platform.is('cordova')) {
      this.sqlService.crearDB();  
    }
      
  }

//Este es el que uso para correr con el timer, 
// haré otro igual para el botón de "Guardar oT pendientes",
// porque si pongo el alert aquí va a aparecer cada que entre el timer
  selecNoGuardada(){
    this.sqlService.selecNoGuardada().then(()=>{
      console.log("Alerta de guardado exitosamente")
    }).catch((error:any)=>{
      console.log("Error al guardar en srvr /Sin pendientes",error)
    });
  }

  guardarPendientes(){
    
    if (this.network.type === "none") {
      this.alertaNetwork();
    }
    else {
      this.sqlService.selecNoGuardada().then(() => {    
        this.alertaOTPendientesGuardadas();
      }).catch((err) => {
        console.log(err)
        // this.alertaNetwork();
      });
    }

  }
 

  actualizarCat(){

     if (this.network.type==="none") 
    {
     this.alertaNetwork();
    }
    else{
    
    this.alertCargarCatalogos();
    
   
    this.sqlService.insertarCatPrioridad_Sql().then(resp => {
      // console.log('resppp')
      console.log(resp);
    }).catch((err:any)=>{
      this.alertFalloCargarCatalogos(err);
    });
    
    this.sqlService.insertarCatTipo_Sql().then(resp => {
      // console.log('resppp')
      console.log(resp);
    }).catch((err:any)=>{
      this.alertFalloCargarCatalogos(err);
    });
    
    this.sqlService.insertarCatEst_Sql().then(resp => {
      // console.log('resppp')
      console.log(resp);
    }).catch((err:any)=>{
      this.alertFalloCargarCatalogos(err);
    });

    this.sqlService.insertarCatEvento_Sql().then(resp => {
      // console.log('resppp')
      console.log(resp);
    }).catch((err:any)=>{
      this.alertFalloCargarCatalogos(err);
    });

    this.sqlService.insertarCatArea_Sql().then(resp => {
      // console.log('resppp')
      console.log(resp);
    }).catch((err:any)=>{
      this.alertFalloCargarCatalogos(err);
    });

    this.sqlService.insertarCatGranja_Sql().then(resp => {
      // console.log('resppp')
      console.log(resp);
    }).catch((err:any)=>{
      this.alertFalloCargarCatalogos(err);
    });

    this.sqlService.insertarCatEquipo_Sql().then(resp => {
      // console.log('resppp')
      console.log(resp);
    }).catch((err:any)=>{
      this.alertFalloCargarCatalogos(err);
    });

  }

  }

  
  cargarCSV(){

    
  }

  async modalLogin(){
    const modal = await this.modalCtrl.create({
      component: LoginPage
    });
    await modal.present();
    const resp = await modal.onDidDismiss();
    console.log('Login Resp', resp)
  }

//asi debo de manejar todos los errores
  // excel(){
    
  //   if(this.network.type==="none") 
  //   {
  //    this.alertaNetwork();
  //    return
  //   }

  //   this.rptService.cargarCSV().then((result:any) =>{
  //     if(result.length >0){
  //       this.lstCSV = result
  //       // console.log('el csv',this.lstCSV)
  //       let noMostrar : any = ['IdOT','Imagen','Prioridad', 'TipoOT','Centro','CodArea','CodEquipo','Grupo'];

  //       this.exportService.exportExcel(this.lstCSV,'Ordenes.xlsx',noMostrar)
  //       this.alertaExcelExportado();
      
  //     }else{
  //       console.log('trono el csv');
  //       this.alertaFalloExcelExportado();

  //     }
      
  //   }). catch((error:any) =>{
  //     // console.log('error weyyy', error)
  //     this.alertaFalloExcelExportadoMensaje(error)

  //   })  

  // }

  async alertCargarCatalogos() {
    const loading = await this.loadingCtrl.create({
      cssClass: '',
      message: 'Actualizando los datos',
      duration: 2000
    });
    await loading.present();
  }

  async alertFalloCargarCatalogos(err) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: err.message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async alertaNetwork() {
    const alert = await this.alertCtrl.create({
      // cssClass: 'my-custom-class',
      header: 'Error',
      // subHeader: 'Para continuar',
      message: 'Debe tener conexión a Internet.',
      buttons: ['OK']
    });
    await alert.present();
  }

  // async alertaCatActualizados() {
   
  //   const alert = await this.alertCtrl.create({
  //     // cssClass: 'my-custom-class',
  //     header: 'Listo',
  //     // subHeader: 'Para continuar',
  //     message: 'Los catálogos han sido actualizados.',
  //     buttons: ['OK']
  //   });
  //   await alert.present();
  // }

  async alertaOTPendientesGuardadas() {
    const alert = await this.alertCtrl.create({
      // cssClass: 'my-custom-class',
      header: 'Listo',
      // subHeader: 'Para continuar',
      message: 'Guardado en el servidor.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async alertaExcelExportado() {
    const alert = await this.alertCtrl.create({
      // cssClass: 'my-custom-class',
      header: 'Listo',
      // subHeader: 'Para continuar',
      message: 'Reporte guardado en la carpeta de descargas.',
      buttons: ['OK']
    });
    await alert.present();
  }
  
  async alertaFalloExcelExportado() {
    const alert = await this.alertCtrl.create({
      // cssClass: 'my-custom-class',
      header: 'Error',
      // subHeader: 'Para continuar',
      message: 'Error al generar Reporte.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async alertaFalloExcelExportadoMensaje(err) {
    const alert = await this.alertCtrl.create({
      // cssClass: 'my-custom-class',
      header: 'Error',
      // subHeader: 'Para continuar',
      message: err.message,
      buttons: ['OK']
    });
    await alert.present();
  }
  // extraerCSV(lst){
  //   let csvData = lst || '' ;

  //   this.papa.parse(csvData, {
  //     complete: parsedData =>{
  //       // console.log('parsedData');
  //       console.log(parsedData.data.splice(0,1))
  //       this.headerRow = parsedData.data.splice(0,0)[0];
  //       this.csvData = parsedData.data;
  //     }
  // })
// }


}
