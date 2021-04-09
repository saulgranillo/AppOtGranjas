import { Component, OnInit } from '@angular/core';
import { AgregarOTService } from '../../services/agregar-ot.service';
import { SqliteService } from '../../services/sqlite.service';
import { interval, Subscription } from 'rxjs';
import { Platform, LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Papa } from 'ngx-papaparse';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';
import { ExportService } from '../../services/export.service';

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
              private exportService : ExportService
              
              ) { }

  ngOnInit() {
    // this.subscripcion = interval(10000).subscribe((x => {
    //   console.log('entre al timer');
    //   this.selecNoGuardada();
    // }));
   
  }
  

  ngAfterViewInit(){
    if (this.platform.is('cordova')) {
      this.sqlService.crearDB();  
    }
    
    this.cargarCSV();
    
  }


  selecNoGuardada(){
    this.sqlService.selecNoGuardada().then(()=>{
      console.log("Alerta de guardado exitosamente")
    }).catch(()=>{
      console.log("alerta de error al guardar en srvr")
    });
  }
 

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

  cargarCSV(){

    this.otService.cargarCSV().then((result:any) =>{
      if(!result.Error){
        this.lstCSV = result
        console.log('el csv',this.lstCSV)
      // this.excel(this.lstCSV);
        // this.extraerCSV(this.lstCSV);
      }else{
        console.log('trono el csv')
      }
    })
  }

  excel(){
    
    let noMostrar : any = ['Imagen'];
    this.exportService.exportExcel(this.lstCSV,'Ordenes.xlsx',noMostrar)

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
