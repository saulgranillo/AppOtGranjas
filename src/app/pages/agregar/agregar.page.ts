import { Component, OnInit } from '@angular/core';
import { AlertController,ModalController, ToastController } from '@ionic/angular';
import { AgregarOTService } from '../../services/agregar-ot.service';
import { ModalGranjaPage } from '../modal-granja/modal-granja.page';
import { ModalAreaPage } from '../modal-area/modal-area.page';
import { ModalTecnicosPage } from '../modal-tecnicos/modal-tecnicos.page';
import { ModalEqupoPage } from '../modal-equpo/modal-equpo.page';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms'
import { SqliteService } from '../../services/sqlite.service';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { Network } from '@ionic-native/network/ngx';
import { ImagenService } from '../../services/imagen.service';

// import { Camera, CameraOptions} from '@ionic-native/camera/ngx';

// import { ImagePicker } from '@ionic-native/image-picker/ngx';
declare var window: any;

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})


export class AgregarPage implements OnInit {
//#region Variables globales
  prioridad : string ;
  codPrioridad : any;

  tipoOt : string;
  codTipoOt : any;
  idTipo : any;
  
  granja : any = 'Seleccionar';
  centroGranja:any;
  objGranja: {};

  areaDesc : any= "Seleccionar";
  area: any;
  objArea : {};
  
  equipo : any = "Seleccionar"; 
  equipoCod: string;
  equipoGrupo: string;
  objEquipo : {};

  actividad : string = "";
  materiales : string = "";
  // ubicacion : string ="";
  objTecnicos : {};
  sala:any;
  
  estatus : any;
  codEstatus: any;
  idEstatus: any;
  codEstatusHidden:any;

  evento: any;
  codEvento : any;

  
  agregarForm:any;

  objGuardar :{};
  lstPrioridad: any[] = [];
  lstTipo: any[] = [];
  lstTecnico: any [] =[];
  tecnico : any;
  lstEstatus : any [] = [];
  lstEvento : any [] = [];

  //imagen
  public base:any;
  imageResponse: any;
  options: any;

  // ListasOfline
  lstTipoSql: any [] = [];
  tipoSql : any;
  estatusSql : any;
  eventoSql : any;
  lstImagenes : any [] = [];
 
  //Validadores
  ionicForm: FormGroup;
  isSubmitted = false;
  btnFotoHidden:any
  btnEliminarFoto:any

  //#endregion
  
  constructor( 
    private otService : AgregarOTService,
    private modalCtrl : ModalController,
    public formBuilder : FormBuilder,
    private alertCtrl : AlertController,
    private toastCtrl : ToastController,
    private sqlService : SqliteService,
    private platform: Platform,
    private files: File,
    private network:Network,
    public imgService : ImagenService,
    // private camara : Camera
    // private imagePicker: ImagePicker
    ) {}

  ngOnInit() {
    this.btnEliminarFoto=1;
    this.btnFotoHidden=0;
    console.log('eliminar ,foto', this.btnEliminarFoto,this.btnFotoHidden)
    this.eliminarImagen();
//  this.imgService.loadSaved();
    if (this.platform.is('cordova')) {
      this.cargarPrioridadSql();
      this.cargarTipoSql();
      this.cargarEstatusSql();
      this.cargarEventoSql();
    }
    else{
      this.cargarPrioridad();
      this.cargarTipo();
      this.cargarEstatus();
      this.cargarEvento();   
    };
    
    //Validadores
    this.ionicForm = this.formBuilder.group({
      // ubicacion: ['', [Validators.required, Validators.minLength(5)]],
      actividad: ['', [Validators.required, Validators.minLength(5)]],
      materiales: ['', [Validators.required, Validators.minLength(5)]]
    })
    //este form es solo para poder darle Reset y vaciar los campos despues de agregar
    this.agregarForm = new FormGroup({
      "agregarForm" : new FormControl()
    });
  
  }
  
  
  // gotoTop(){
  //   this.content.scrollToTop();
  // }


  cargarPrioridad() {
    this.otService.cargarPrioridadLista().then((prio:[]) =>{
      this.lstPrioridad = prio.concat();
      // console.log(this.lstPrioridad)
    });
    
  }

  cargarPrioridadSql() {
    this.sqlService.selectCatPrioridad_Sql().then((prio:[]) =>{
      this.lstPrioridad = prio.concat();
      // console.log(this.lstPrioridad)
    });
    
  }

  checkPrioridad(value){
    // console.log(value)
    // this.prio = value.detail;
    // console.log(this.prio);
    this.codPrioridad = value.detail;
    // console.log(this.codPrioridad)
    // hago esto de la var i para enviar ese index a la lstPrioridad y cargar el nombre de la prioridad de manera dinamica
    var i = this.codPrioridad.value;
    // console.log(i)
    i = i-1;
   
      this.prioridad = this.lstPrioridad[i].Nombre;
    
    // console.log('aqui')
    // console.log(this.prioridad)

  }

  cargarTipo() {
    this.otService.cargarTipoLista().then((tipo:[]) =>{
      this.lstTipo = tipo.concat(); 
      //  console.log(this.lstTipo)
    });
  }

  cargarTipoSql() {
    this.sqlService.selectCatTipo_Sql().then((tipo:[]) =>{
      this.lstTipo = tipo.concat(); 
      //  console.log(this.lstTipo)
    });
  }

  checkTipo(tipo){
    this.codTipoOt = tipo.detail;
    // console.log(this.codTipoOt)
    // Con la función getID obtengo el row del arreglo que se selecciono  y así puedo obtener la descripcion del tipo ot de manera dinamica 
    var tipo = this.lstTipo[this.idTipo].Tipo;
    this.tipoOt = tipo;
  }
  
  getIdTipo(i){
    //Se creó para obtener el Id del registro del arreglo que se selecciono y de aquí sacar la descripcion del tipo de OT
    this.idTipo  = i;
    // console.log(this.idTipo)
  }

  cargarEstatus(){
    this.otService.cargarEstatusLista().then((estatus:[]) =>{
      this.lstEstatus = estatus.concat();
      // console.log('estatus')
      // console.log(this.lstEstatus);
    });
  }

  cargarEstatusSql(){
    this.sqlService.selectCatEstatus_Sql().then((estatus:[]) =>{
      this.lstEstatus = estatus.concat();
      // console.log('estatus')
      // console.log(this.lstEstatus);
    });
  }

  checkEstatus(estatus){
    // console.log(estatus);
    this.codEstatus = estatus.detail;
    // console.log('codestatus');
    // console.log(this.codEstatus)
    if (this.codEstatus.value =='N') {
      // console.log('entro al if')
     this.codEstatusHidden = 1
    //  console.log('en iff')
    //   console.log(this.codEstatusHidden)
     
    }
    else{
      this.codEstatusHidden = 0
      // console.log('en el else')
      // console.log(this.codEstatusHidden)
    }

    // Con la función getID obtengo el row del arreglo que se selecciono  y así puedo obtener la descripcion del tipo ot de manera dinamica 
    var IdEst = this.lstEstatus[this.idEstatus].Estatus;
    this.estatus = IdEst;

    // console.log( this.estatus);
    // console.log('this.codEstatusHidden');
    // console.log(this.codEstatusHidden)
  }

  getIdEstatus(i){
   
    this.idEstatus = i;
    // hay que ver en donde lo puedo poner de manera correcta
    
    this.codEstatusHidden=0
  }

  cargarEvento(){
    this.otService.cargarEventoLista().then((evento:[]) =>{
      this.lstEvento = evento.concat();
      // console.log(this.lstEvento);
    });
  }

  cargarEventoSql(){
    this.sqlService.selectCatEvento_Sql().then((evento:[]) =>{
      this.lstEvento = evento.concat();
      // console.log(this.lstEvento);
    });
  }

  checkEvento(evento){
    //  console.log(evento);
    this.codEvento = evento.detail;

    // console.log(this.codEvento);
  }

  obtenerEvento(i){
    // lo uso para obtener la descripcion del tipo evento
    // console.log('entre')
    // console.log(i);
    this.evento = this.lstEvento[i].Evento

    // console.log(this.evento);

  }

  async modalGranja(){

    const modal = await this.modalCtrl.create({
      component:ModalGranjaPage
    });
    await modal.present();

    const resp = await modal.onDidDismiss();
    // console.log(resp.data);
  // Tuve que crear otra variable para asignar el Centro, ya que con el .trim al nombre, se me borraba todo lo demás del obj
    this.granja = resp.data.nombre.trim();
    this.centroGranja= resp.data.Centro
    this.objGranja = {
      Centro: this.centroGranja, 
      nombre: this.granja}

    // console.log('granja');
    // console.log(this.objGranja);

  }

  async modalArea(){

    const modal = await this.modalCtrl.create({
      component:ModalAreaPage
    });
    await modal.present();

    const resp = await modal.onDidDismiss();
    // console.log(resp)
    this.areaDesc = resp.data.AreaDesc.trim();
    this.area = resp.data.Area;
    this.objArea = {
      Area : this.area,
      AreaDesc: this.areaDesc
    }

    // console.log(this.objArea);
  }

  async modalEquipo(){

    const modal = await this.modalCtrl.create({
      component:ModalEqupoPage
    });
    await modal.present();

    const resp = await modal.onDidDismiss();
    // console.log('de equipo resp')
    // console.log(resp);
    //este lo uso para el html
    this.equipo = resp.data.Descripcion;
    //asigno los valores de las demas variables, luego las meto al objeto
    this.equipoCod = resp.data.Codigo;
    this.equipoGrupo = resp.data.Grupo;
    this.objEquipo = {
      Equipo : this.equipo,
      CodEquipo : this.equipoCod,
      Grupo : this.equipoGrupo
    }
    // console.log('el obj equipo');
    // console.log(this.objEquipo)
  
  }

  async modalTecnico(){
// this.tecnico=""
    const modal = await this.modalCtrl.create({
      component: ModalTecnicosPage
    });
    await modal.present();

    const resp = await modal.onDidDismiss();
    
    // this.tecnico = resp.data.nombre
    // console.log('this.tecnico');
    // console.log(this.tecnico);
   if (this.lstTecnico.length >= 5) {
     this.maxTecnicos();
   }else{
    this.lstTecnico.push(resp.data);
    console.log(this.lstTecnico);
   }  
    

  }

  eliminarTecnico(i){
    // console.log(i)
    this.lstTecnico.splice(i,1);
  }

  txtActividad(event){
    this.actividad= event.detail; //event.detail.value; lo dejo así para mantenerla en un obj
    // console.log(this.actividad);
  }

  txtMateriales(event){
    this.materiales= event.detail;  //event.detail.value;
    // console.log(this.materiales);
  }
  
  salaValor(e){
    this.sala = e.detail.value;
    // console.log(this.sala);
  
  }

  agregarImagen(){
    this.imgService.addNewToGallery().then((res) =>{
      if (this.imgService.photos.length >= 1) {
        this.btnFotoHidden =1;
        this.btnEliminarFoto=0;
        console.log(this.btnFotoHidden)
      } 
    })
   
  }

  agregarGaleria(){
    
    this.imgService.selectFromGallery().then((res) =>{
      if (this.imgService.photos.length >= 1) {
        console.log('EL RES en agregar', res)
        this.btnFotoHidden =1;
        this.btnEliminarFoto=0;
        console.log(this.btnFotoHidden)
      } 
    })


    // const options: CameraOptions = {
    //   quality: 100,
    //   destinationType: this.camara.DestinationType.FILE_URI,
    //   encodingType: this.camara.EncodingType.JPEG,
    //   mediaType: this.camara.MediaType.PICTURE,
    //   correctOrientation: true,
    //   sourceType: this.camara.PictureSourceType.PHOTOLIBRARY
    // };

    // this.camara.getPicture(options).then((imageData) =>{
    //   // let base64Image = 'data:image/jpeg;base64,' + imageData;

    //   const img = window.Ionic.WebView.convertFileSrc( imageData )
    //   console.log(img)

    //   //agrego al arreglo
    //   this.imgService.photos.push(imageData)

    // }, (err) =>{
    //   console.log('accediendo galeria',err)
    // })
  }

  // agregarImagenGaleria(){
  //   this.options = {
  //     // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
  //     // selection of a single image, the plugin will return it.
  //     maximumImagesCount: 1,

  //     // max width and height to allow the images to be.  Will keep aspect
  //     // ratio no matter what.  So if both are 800, the returned image
  //     // will be at most 800 pixels wide and 800 pixels tall.  If the width is
  //     // 800 and height 0 the image will be 800 pixels wide if the source
  //     // is at least that wide.
  //     width: 200,
  //     //height: 200,

  //     // quality of resized image, defaults to 100
  //     quality: 100,

  //     // output type, defaults to FILE_URIs.
  //     // available options are 
  //     // window.imagePicker.OutputType.FILE_URI (0) or 
  //     // window.imagePicker.OutputType.BASE64_STRING (1)
  //     outputType: 1
  //   };

  //   this.imageResponse = [];
  //   this.imagePicker.getPictures(this.options).then((results) => {
  //     for (var i = 0; i < results.length; i++) {
  //       this.imageResponse.push('data:image/jpeg;base64,' + results[i]);
  //       console.log('imgGaleria',this.imageResponse)
  //     }
  //   }, (err) => {
  //     alert(err);
  //   });
  
  // }

  eliminarImagen(){
    this.imgService.deleteImage();
    if (this.imgService.photos.length ==0 || this.imgService.photos.length == undefined) {
      this.btnEliminarFoto = 1;
      this.btnFotoHidden=0;
    }
  }

  guardarObj(){
 
    if (this.codEstatusHidden == 1) {
      this.lstTecnico[0] = "";
      this.lstTecnico[1] = "";
      this.lstTecnico[2] = "";
      this.lstTecnico[3] = "";
      this.lstTecnico[4] = "";
      // this.tecnico = "",
        this.evento = "",
        this.codEvento = ""
    } else {
      this.prioridad = "",
        this.codPrioridad = ""
    }

    this.isSubmitted = true;
    if (!this.ionicForm.valid || this.prioridad == undefined || this.codPrioridad == undefined || this.tipoOt == undefined || this.codTipoOt == undefined || this.objGranja == undefined || this.objArea == undefined
      || this.objEquipo == undefined  || this.estatus == undefined || this.codEstatus == undefined || this.evento == undefined || this.codEvento == undefined || this.sala == undefined
      ) {
        // || this.tecnico == undefined
        // this.lstTecnico.length <= 0

      this.alertaValidarForm();
      return false;
    }
    else {
      // console.log(this.lstTecnico);
      this.base = this.imgService.base
      console.log('Base de imgService on agregar',this.base)

      console.log(this.ionicForm.value)
      this.objGuardar = {
        prioridad: this.prioridad,
        codPrioridad: this.codPrioridad.value,
        tipo: this.tipoOt,
        codTipoOt: this.codTipoOt.value,
        granja: this.objGranja,
        area: this.objArea,
        sala: this.sala,
        equipo: this.objEquipo,
        actividad: this.actividad,
        materiales: this.materiales,
        estatus: this.estatus,
        codEstatus: this.codEstatus,
        tecnico1: this.lstTecnico[0],
        tecnico2: this.lstTecnico[1],
        tecnico3: this.lstTecnico[2],
        tecnico4: this.lstTecnico[3],
        tecnico5: this.lstTecnico[4],
        evento: this.evento,
        codEvento: this.codEvento,
        lstImagenes: this.base
      }
 // valido para guardar desde la compu o el cel
      if (this.platform.is('cordova')) {

        // console.log('voy a guardar',this.objGuardar);
        this.sqlService.GuardarCatOt_Sql(this.objGuardar).then((result: any) => {
          this.lstTecnico.length = 0;

          if (result.insertId > 0 || result.insertId != undefined) {
            console.log('guardarSQlresult', result);
            
            //me voy a guardar la relación foto
            // this.lstImagenes = this.imgService.imagenes
            //intentare guardar el base64

            // this.files.readAsDataURL(this.imgService.photos[0].webviewPath,"foto.jpeg").then(base64File =>{
            //   console.log('elbase 64', base64File);
          console.log('este guardare',this.base);
              this.sqlService.insertarRelImagen_Sql(result.insertId,this.base).catch((err:any)=>{
                this.alertaErrorAgregar(err);
              })

            // })
            

            //Valido la conexión para mostrar el diferente alert
            if(this.network.type==="none") 
            {
             this.agregadoLocalToast();
            }
            else{
            this.agregadoToast();
            }
            document.querySelector('app-agregar').querySelector('ion-content').scrollToTop();
            this.ionicForm.reset();
            this.agregarForm.reset();
            this.granja = "Seleccionar"
            this.areaDesc = "Seleccionar"
            this.equipo = "Seleccionar"
            this.lstTecnico.length = 0;
            this.eliminarImagen();

          } else {
            let err = "Error agregar SQLite"
            this.alertaErrorAgregar(err);
          }


        });

      }
      else {
        this.otService.guardarOTOnline(this.objGuardar).then((result: any) => {
          this.lstTecnico.length = 0;
          if (result.MsgError != "") {
            this.alertaErrorAgregar(result.MsgError);
          } else {
            this.agregadoToast();
            document.querySelector('app-agregar').querySelector('ion-content').scrollToTop();
            this.ionicForm.reset();
            this.agregarForm.reset();
            this.granja = "Seleccionar"
            this.areaDesc = "Seleccionar"
            this.equipo = "Seleccionar"
            this.lstTecnico.length = 0;
            this.eliminarImagen();
          }
        })
      };


    }
    
  }

  // lo use para prueba
  guardarImagen(){
    this.base = this.imgService.base
      console.log(this.base)
      this.otService.guardarImagen(this.base).then((result:any) =>{
      if(result.MsgError != ""){
        console.log("Error imagen")
      }
      else
      {
        console.log("Imajen guardó")
      }
      })
  }
 

  get errorCtrl() {
    // console.log(this.ionicForm.controls)
    return this.ionicForm.controls;
  }

  base64(){
    this.files.readAsDataURL(this.imgService.photos[0].webviewPath,"foto.jpeg").then(base64File =>{
      console.log('elbase 64', base64File);

      //Inserto en tabla 
      // this.sqlService.insertarRelImagen_Sql(result.insertId,this.base).catch((err:any)=>{
      //   this.alertaErrorAgregar(err);
      // })

    }).catch((err) =>{
      console.log('error wey', err);
    })
    
  }


  async alertaValidarForm() {
    const alert = await this.alertCtrl.create({
      // cssClass: 'my-custom-class',
      header: 'Error',
      // subHeader: 'Para continuar',
      message: 'Favor de llenar todos los campos.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async alertaErrorAgregar(err) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: err,
      buttons: ['OK']
    });
    alert.present();
  }

  async agregadoToast() {
    const toast = await this.toastCtrl.create({
      message: 'Guardado con éxito',
      color:"success",
      animated: true,
      duration: 1500
    });
    toast.present();
  }

  async agregadoLocalToast() {
    const toast = await this.toastCtrl.create({
      message: 'Guardado local con éxito',
      color:"warning",
      animated: true,
      duration: 1500
    });
    toast.present();
  }

  async maxTecnicos() {
    const alert = await this.alertCtrl.create({
      // cssClass: 'my-custom-class',
      header: 'Error',
      // subHeader: 'Para continuar',
      message: 'Maximo 5 técnicos',
      buttons: ['OK']
    });
    await alert.present();
  }


  
  // obtenerTipo() {
  //   console.log("entre al obtener");
  // this.lstTipoSql = [] ; 
  //   this.sqlService.database.executeSql('SELECT * FROM CatTIpo', []).then(res => {
  //     console.log("hice la consulta ");
  //     if (res.rows.length > 0) {
  //       console.log('resInicio', res)
  //       for (let i = 0; i < res.rows.length; i++) {
  //         this.lstTipoSql.push({
  //           id: res.rows.item(i).IdTipo,
  //           tipo: res.rows.item(i).Tipo,
  //           codigo: res.rows.item(i).Codigo
  //         });
  //       }
  //       console.log('ITEMS', this.lstTipoSql)
  //     }
  //   });

  // }

//  async getSqlite(){
//     console.log('entre al getSqlite')
//   let aver =  this.sqlService.se();
//     console.log('saco algo?');
//     console.log(aver);
//   }



}








// CODIGO NO SE USA

// guardarOT(objOT:{}){
  //   this.otService.guardarOT(objOT).then((result:any) =>{
  //     if(result.MsgError != ""){
  //       this.alertaErrorAgregar(result.MsgError);
  //     }else{
  //       this.agregadoToast();
  //       document.querySelector('app-agregar').querySelector('ion-content').scrollToTop();
  //       this.ionicForm.reset();
  //       this.agregarForm.reset();
  //       this.granja="Seleccionar"
  //       this.areaDesc="Seleccionar"
  //       this.equipo="Seleccionar"
  //     }

  //   })
  // }

    // submitForm() {
  //   this.isSubmitted = true;
  //   if (!this.ionicForm.valid && this.prioridad == undefined && this.codPrioridad == undefined) {
  //     console.log('Favor de llenar todos los campos')
  //     return false;
  //   } else {
  //     console.log(this.ionicForm.value)
  //   }
  // }


  // creardb(){
  //   debugger;
  //   this.sqlService.crearCatOT();

  // }

  


