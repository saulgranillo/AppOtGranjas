import { Component, OnInit } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { ReportesService } from '../../services/reportes.service';
import { Platform, LoadingController, AlertController } from '@ionic/angular';
import { ExportService } from '../../services/export.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ImagenService } from '../../services/imagen.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';

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
  folio :number;
  reportesForm: FormGroup;
  imgHidden:any;
  btnHiddenShare:any;
  btnHiddenEliminarFoto:any
  base64Image:string = '';
  nuevaImg:string ='';

  constructor(
    private network: Network,
    private alertCtrl : AlertController,
    private rptService : ReportesService
    ,private exportService : ExportService
    ,private formBuilder : FormBuilder
    ,private imgService : ImagenService
    ,private socialSharing : SocialSharing
    ,private platform: Platform
    ,private files: File
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
    this.reportesForm = this.formBuilder.group({ 
     folioImg: ['', [Validators.required, Validators.pattern("^[0-9]*$") ]]
    })
    this.imgHidden=0;
    this.btnHiddenShare=0;
    this.btnHiddenEliminarFoto=0;
    console.log('hidden en el oninit img,btn', this.imgHidden,this.btnHiddenShare);
    
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

  imagenXId(){
    // if(this.reportesForm.valid){
   
      this.imgService.cargarXId(this.folio).then((data:any)=>{
        if(data.clsModResultado.MsgError){
          this.alertaFalloImagenXId(data.clsModResultado.MsgError);
        }
        if(data.Imagen){            
        
          this.base64Image = data.Imagen;
          var imgSinFormato = this.base64Image.split(";")[1];
         var aString= imgSinFormato.toString();
          var formato = 'data:image/jpeg;';        
         var nueva :string;
         nueva.concat(formato,aString);
          // this.nuevaImg.concat(formato, aString);
          // this.base64Image.concat(formato,prueba);
          // this.nuevaImg.concat(formato,imgSinFormato);
        

          console.log(nueva);
          if(this.base64Image){
            this.btnHiddenShare=1;  
            this.btnHiddenEliminarFoto=1;
             
          }
          
          // this.imgHidden=1;
          // console.log('hidden en el ImagenXId', this.imgHidden);
          //this.imgService.rptImagen(data.Imagen);
        }
      }).catch((error) =>{
        console.log(error)
      })

    // }else{
    //   this.alertaFolioOT();
    // }
  }

  inputimgXId(event){
    this.folio = event.detail.value;
    console.log('elfolio',this.folio);
  }

  shareImage(){
    // if (this.platform.is('cordova')) {
     
    this.socialSharing.share(null,null,this.base64Image,null);
        
    // }else{
    //   var csv = ''
    //   var blob = new Blob([csv]);
    //   var a = window.document.createElement('a');
    //   a.href = window.URL.createObjectURL(blob);
    //   a.download = 'newdata.csv';
    //   a.click();
    //   document.body.removeChild(a);
    // }
  }

  eliminarImagen(){
    this.base64Image='';
    this.btnHiddenShare=0;
    this.imgHidden=0;
    this.btnHiddenEliminarFoto=0;
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
  
  async alertaFolioOT() {
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      message: 'Capturar un folio valido.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async alertaFalloImagenXId(err) {
    const alert = await this.alertCtrl.create({
      // cssClass: 'my-custom-class',
      header: 'Error',
      // subHeader: 'Para continuar',
      message: err,
      buttons: ['OK']
    });
    await alert.present();
  }


}
