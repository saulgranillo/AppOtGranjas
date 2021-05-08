import { Component, OnInit } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { ReportesService } from '../../services/reportes.service';
import { Platform, LoadingController, AlertController } from '@ionic/angular';
import { ExportService } from '../../services/export.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {

  lstCSV: any[] = [];
  lstXFechas: any[] = [];
  fechaIniOptions: any;
  fechaFinOptions: any;
  fIni: any;
  fFin: any;


  constructor(
    private network: Network,
    private alertCtrl : AlertController,
    private rptService : ReportesService,
    private exportService : ExportService,
  ) { 
    this.fechaIniOptions = {
      buttons: [{
        text: 'Seleccionar',
        handler: (value) => {
          this.fIni= value 
        console.log('FIni',this.fIni)
        }
      }
    ]}

    this.fechaFinOptions = {
      buttons: [{
        text: 'Seleccionar',
        handler: (value) =>{
          this.fFin = value
          console.log('fFIn',this.fFin)
        }
      }]
    }
  }

  ngOnInit() {
  }
  

  excel(){
    
    if(this.network.type==="none") 
    {
     this.alertaNetwork();
     return
    }

    this.rptService.cargarCSV().then((result:any) =>{
      if(result.length >0){
        this.lstCSV = result
        // console.log('el csv',this.lstCSV)
        let noMostrar : any = ['IdOT','Imagen','Prioridad', 'TipoOT','Centro','CodArea','CodEquipo','Grupo'];

        this.exportService.exportExcel(this.lstCSV,'Ordenes.xlsx',noMostrar)
        this.alertaExcelExportado();
      
      }else{
        console.log('trono el csv');
        this.alertaFalloExcelExportado();

      }
      
    }). catch((error:any) =>{
      // console.log('error weyyy', error)
      this.alertaFalloExcelExportadoMensaje(error)

    })  

  }

  validarFechas(){


    if (this.fIni == undefined || this.fFin == undefined) {
      this.alertaLlenarFechas();
      return
    }
    var diaIni = this.fIni.day.text
    const mesIni = this.fIni.month.text
    const anoIni = this.fIni.year.text

    var diaFin = this.fFin.day.text
    const mesFin = this.fFin.month.text
    const anoFin = this.fFin.year.text

    var fechaIni = diaIni +"/"+ mesIni +"/"+ anoIni 
    var fechaFin = diaFin +"/"+ mesFin +"/"+ anoFin
    console.log('Fechaini',fechaIni, 'Fechafin', fechaFin)

    //Validar las fechas
  
    if(fechaFin < fechaIni ){
      this.alertaFechaFin();
    }

    this.reporteXFechas(fechaIni,fechaFin)
  }

  reporteXFechas(fechaIni, fechaFin){

    if(this.network.type==="none") 
    {
     this.alertaNetwork();
     return
    }

    this.rptService.cargarXFechas(fechaIni,fechaFin).then((result:any) =>{
      if (result.length > 0) {
        this.lstXFechas = result
        console.log(result)  
        let noMostrar : any = ['IdOT','Imagen','Prioridad', 'TipoOT','Centro','CodArea','CodEquipo','Grupo'];
        this.exportService.exportExcel(this.lstXFechas,'OrdenesFecha.xlsx',noMostrar)
        this.alertaExcelExportado();
      
      }else{
        console.log('trono el csv');
        this.alertaFalloExcelExportado();

      }
      
    }).catch((error) =>{
      console.log(error) 
      this.alertaFalloExcelExportadoMensaje(error)
 
    })


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

  async alertaFechaFin() {
    const alert = await this.alertCtrl.create({
      // cssClass: 'my-custom-class',
      header: 'Error',
      // subHeader: 'Para continuar',
      message: 'Fecha fin debe ser mayor a fecha inicio.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async alertaLlenarFechas() {
    const alert = await this.alertCtrl.create({
      // cssClass: 'my-custom-class',
      header: 'Alerta',
      // subHeader: 'Para continuar',
      message: 'Capturar ambas fechas.',
      buttons: ['OK']
    });
    await alert.present();
  }


}
