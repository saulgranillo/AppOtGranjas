import { Component, OnInit } from '@angular/core';
import { AlertController,ModalController, ToastController } from '@ionic/angular';
import { AgregarOTService } from '../../services/agregar-ot.service';
import { ModalGranjaPage } from '../modal-granja/modal-granja.page';
import { ModalAreaPage } from '../modal-area/modal-area.page';
import { ModalTecnicosPage } from '../modal-tecnicos/modal-tecnicos.page';
import { ModalEqupoPage } from '../modal-equpo/modal-equpo.page';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms'
import { SqliteService } from '../../services/sqlite.service';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})


export class AgregarPage implements OnInit {

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
  

  // ListasOfline
  lstTipoSql: any [] = [];
  tipoSql : any;
  estatusSql : any;
  eventoSql : any;

  //Validadores
  ionicForm: FormGroup;
  isSubmitted = false;

  constructor( 
    private otService : AgregarOTService,
    private modalCtrl : ModalController,
    public formBuilder : FormBuilder,
    private alertCtrl : AlertController,
    private toastCtrl : ToastController,
    private sqlService : SqliteService
    ) {}

  ngOnInit() {
 
    
    this.cargarPrioridad();
    this.cargarTipo();
    this.cargarEstatus();
    this.cargarEvento();   
    
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
  
  // creardb(){
  //   this.sqlService.crearDB().then( res => {
  //     console.log('creardb desde agregar')
  //     console.log(res);
  //   });
  // }

  // crearTablas(){
  //   this.sqlService.crearTablas().then( res =>{
  //     console.log('crear tablas desde agregar');
  //     console.log(res)
  //   });
  // }

  // insertar(){
  //   this.sqlService.insertarCatTipo();
  // }

  // sql(){
  //   this.sqlService.selectCatTipo().then( res => {
  //     console.log('respuesta del select en agregar')
  //     this.tipoSql = res;
  //     console.log(this.tipoSql);
  //  });
  
  // }

  sync() {
// CatTIPO
    this.sqlService.insertarCatTipo_Sql().then(resp => {
      // console.log('resppp')
      console.log(resp);

      this.sqlService.selectCatTipo_Sql().then(res => {
        // console.log('respuesta del select en agregar')
        this.tipoSql = res;
        // console.log(this.tipoSql);
      });
    })
// CatEstatus
    this.sqlService.insertarCatEst_Sql().then(resp => {
      // console.log('ESTATUS RESP')
      console.log(resp);

      this.sqlService.selectCatEstatus_Sql().then(res => {
        // console.log('rsp Estatus')
        this.estatusSql = res;
        // console.log(this.estatusSql);
      });
    })
// CatEvento
    this.sqlService.insertarCatEvento_Sql().then(resp => {
      // console.log('EVENTO RESP')
      console.log(resp);

      this.sqlService.selectCatEvento_Sql().then(res => {
        // console.log('rsp Evento')
        this.eventoSql = res;
        // console.log(this.eventoSql);
      });
    })
    
// CatArea
    this.sqlService.insertarCatArea_Sql().then(resp => {
      // console.log('AREA insertado')
      console.log(resp);
    });

// CatGranja
      this.sqlService.insertarCatGranja_Sql().then(resp => {
        console.log('Granja insertado')
        // console.log(resp);
      });

// CatEquipo
      this.sqlService.insertarCatEquipo_Sql().then(resp => {
        console.log('EQUIPOinsertado')
        console.log(resp);
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

  checkEstatus(estatus){
    // console.log(estatus);
    this.codEstatus = estatus.detail;
    // console.log('codestatus');
    // console.log(this.codEstatus)
    if (this.codEstatus.value =='N') {
      // console.log('entro al if')
     this.codEstatusHidden = 1
     console.log('en iff')
      console.log(this.codEstatusHidden)
     
    }
    else{
      this.codEstatusHidden = 0
      console.log('en el else')
      console.log(this.codEstatusHidden)
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
    // console.log('resp')
    // console.log(resp)
    this.tecnico = resp.data.nombre
    // console.log('this.tecnico');
    // console.log(this.tecnico);
    
    // this.lstTecnico.push(resp.data);

    // console.log(this.lstTecnico);

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


  guardarObj(){
    
    // console.log(this.lstTecnico)
    
    if (this.codEstatusHidden == 1) {

      this.tecnico = "",
        this.evento = "",
        this.codEvento = ""
    } else {
      this.prioridad = "",
        this.codPrioridad = ""
    }

    this.isSubmitted = true;
    if (!this.ionicForm.valid || this.prioridad == undefined || this.codPrioridad == undefined || this.tipoOt == undefined || this.codTipoOt == undefined || this.objGranja == undefined || this.objArea == undefined
      || this.objEquipo == undefined  || this.tecnico == undefined  || this.estatus == undefined || this.codEstatus == undefined
      || this.evento == undefined || this.codEvento == undefined) {
        // this.lstTecnico.length <= 0

      this.alertaValidarForm();
      return false;
    }
    else {
      

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
        tecnicos: this.tecnico,
        evento: this.evento,
        codEvento: this.codEvento
      }
      console.log('guardar en agregar')
      console.log(this.objGuardar);

      this.otService.guardarOT(this.objGuardar).then((result: any) => {
        console.log(result);
        this.lstTecnico.length=0;
        if (result.MsgError != "") {
          this.alertaErrorAgregar(result.MsgError);
        }
        else {
          
        // document.querySelector('app-agregar').querySelector('ion-content').scrollToTop();
          
        this.agregadoToast();
        document.querySelector('app-agregar').querySelector('ion-content').scrollToTop();
          this.ionicForm.reset();
          this.agregarForm.reset();
          this.granja="Seleccionar"
          this.areaDesc="Seleccionar"
          this.equipo="Seleccionar"
          this.lstTecnico.length=0;
          
          
        }
      }).catch((err) => {
        console.log(err);
      });

    }
    
    console.log(this.objGuardar)
  }
 

  get errorCtrl() {
    // console.log(this.ionicForm.controls)
    return this.ionicForm.controls;
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

  


