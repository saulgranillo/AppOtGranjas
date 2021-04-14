import { Component, OnInit } from '@angular/core';
import { AgregarOTService } from '../../services/agregar-ot.service';
import { SqliteService } from '../../services/sqlite.service';
import { interval, Subscription } from 'rxjs';
import { Platform, LoadingController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Papa } from 'ngx-papaparse';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';
import { ExportService } from '../../services/export.service';
import { Network } from '@ionic-native/network/ngx';


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
  constructor(private otService: AgregarOTService, 
              private sqlService : SqliteService,
              private platform: Platform,
              private loadingCtrl : LoadingController,
              private http: HttpClient,
              private papa: Papa,
              private files: File,
              private socialSharing: SocialSharing,
              private exportService : ExportService,
              private network: Network,
              private alertCtrl : AlertController
              
              ) { }

  ngOnInit() {
    this.subscripcion = interval(10000).subscribe((x => {
      console.log('entre al timer');
      this.selecNoGuardada();

    }));
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

    // this.alertaCatActualizados();
  }

  }

  
  cargarCSV(){

    
  }
//asi debo de manejar todos los errores
  excel(){
    
    if(this.network.type==="none") 
    {
     this.alertaNetwork();
     return
    }

    this.otService.cargarCSV().then((result:any) =>{
      if(result.length >0){
        this.lstCSV = result
        // console.log('el csv',this.lstCSV)
        let noMostrar : any = ['Imagen','CodPrioridad', 'CodTipoOT','Centro','CodArea','CodEquipo','IdOT'];

        this.exportService.exportExcel(this.lstCSV,'Ordenes.xlsx',noMostrar)
        this.alertaExcelExportado();
      
      }else{
        console.log('trono el csv');
        this.alertaFalloExcelExportado();

      }
    }).catch((error:any) =>{
      console.log('error weyyy', error)
      this.alertaFalloExcelExportadoMensaje(error)

    })
    
     

  
    

  }

  async alertCargarCatalogos() {
    const loading = await this.loadingCtrl.create({
      cssClass: '',
      message: 'Actualizando los datos',
      duration: 2000
    });
    await loading.present();
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
