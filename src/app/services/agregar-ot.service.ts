import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
// import { promise } from 'protractor';
// import { ModalGranjaPage } from '../pages/modal-granja/modal-granja.page';


@Injectable({
  providedIn: 'root'
})
export class AgregarOTService {

  lstEquipo :any //: any [] = [];
  lstPrioridad : any;
  lstTipoOT : any;
  lstArea : any;
  lstGranja : any;
  lstEstatus : any;
  lstTipoEvento : any;
  lstTecnicos : any;
  lstCSV : any;

  
  constructor( private http : HttpClient) { }

  // obtenerAlbumes(){
  //   return this.http.get<any[]>('https://jsonplaceholder.typicode.com/albums');
  // }

  cargarEquipoLista(){

    let promise = new Promise((resolve, reject) =>{
      this.http.get(`${environment.urlApiOrdenesTrabajo}/OT/CargarEquipo`).toPromise().then(
        res =>{
          this.lstEquipo = res ;               
          resolve( res );
        },
        msg => {
          reject (msg);
        }
      )
    });
    return promise;

    // return new Promise((resolve, reject) => {
    //   this.http.get(`${environment.urlApiOrdenesTrabajo}/OrdenesTrabajo/CargarEquipo`)
    //     .subscribe((val: []) => {

    //       this.lstEquipo = val;
    //       resolve(val);
    //     },
    //       reject
    //     );
    // });
  }

  cargarPrioridadLista(){

    let promise = new Promise((resolve, reject) =>{
      this.http.get(`${environment.urlApiOrdenesTrabajo}/OT/CargarPrioridad`).toPromise().then(
        res =>{
          this.lstPrioridad = res ;               
          resolve( res );
        },
        msg => {
          reject (msg);
        }
      )
    });
    return promise;
  }

  cargarTipoLista(){

    let promise = new Promise((resolve, reject) =>{
      this.http.get(`${environment.urlApiOrdenesTrabajo}/OT/CargarTipo`).toPromise().then(
        res =>{
          this.lstTipoOT = res ;               
          resolve( res );
        },
        msg => {
          reject (msg);
        }
      )
    });
    return promise;
  }

  cargarAreaLista(){

    let promise = new Promise((resolve, reject) =>{
      this.http.get(`${environment.urlApiOrdenesTrabajo}/OT/CargarArea`).toPromise().then(
        res =>{
          this.lstArea = res ;               
          resolve( res );
        },
        msg => {
          reject (msg);
        }
      )
    });
    return promise;
  }

  cargarGranjaLista(){

    let promise = new Promise((resolve, reject) =>{
      this.http.get(`${environment.urlApiOrdenesTrabajo}/OT/CargarGranja`).toPromise().then(
        res =>{
          this.lstGranja = res ;               
          resolve( res );
        },
        msg => {
          reject (msg);
        }
      )
    });
    return promise;
  }

  cargarEstatusLista(){
    let promise = new Promise((resolve, reject) =>{
      this.http.get(`${environment.urlApiOrdenesTrabajo}/OT/CargarEstatus`).toPromise().then(
        res =>{
          this.lstEstatus = res ;               
          resolve( res );
        },
        msg => {
          reject (msg);
        }
      )
    });
    return promise;
  }

  cargarEventoLista(){
    let promise = new Promise((resolve, reject) =>{
      this.http.get(`${environment.urlApiOrdenesTrabajo}/OT/CargarEvento`).toPromise().then(
        res =>{
          this.lstTipoEvento = res ;               
          resolve( res );
        },
        msg => {
          reject (msg);
        }
      )
    });
    return promise;
  }

  cargarTecnicosLista(){
    let promise = new Promise((resolve, reject) =>{
      this.http.get(`${environment.urlApiOrdenesTrabajo}/OT/CargarTecnicos`).toPromise().then(
        res =>{
          this.lstTecnicos = res ;               
          resolve( res );
        },
        msg => {
          reject (msg);
        }
      )
    });
    return promise;
  }

  guardarOTdesdeSql(objGuardar:any){
    // JSON.stringify(objGuardar);
    var Prioridad = objGuardar.Prioridad 
    var CodPrioridad = objGuardar.CodPrioridad
    var TipoOT = objGuardar.TipoOT
    var CodTipoOT = objGuardar.CodTipoOT
    var Granja = objGuardar.Granja
    var Centro = objGuardar.Centro
    var Area = objGuardar.Area
    var CodArea = objGuardar.CodArea
    var Sala = objGuardar.Sala
    var Equipo = objGuardar.Equipo
    var CodEquipo = objGuardar.CodEquipo
    var Grupo = objGuardar.Grupo 
    var Actividad = objGuardar.Actividad
    var Materiales = objGuardar.Materiales
    var Estatus = objGuardar.Estatus
    var CodEstatus = objGuardar.CodEstatus
    var Tecnico1 = objGuardar.Tecnico1
    var Tecnico2 = objGuardar.Tecnico2
    var Tecnico3 = objGuardar.Tecnico3
    var Tecnico4 = objGuardar.Tecnico4
    var Tecnico5 = objGuardar.Tecnico5
    var TipoEvento = objGuardar.TipoEvento
    var CodEvento = objGuardar.CodEvento
    var FileName = objGuardar.FileName

    console.log('objGuardar en otService', objGuardar.FileName)

    const options ={
      headers: new HttpHeaders().append('Content-Type','application/json; charset=utf-8')
    }

    return new Promise ((resolve, reject) =>{
      
      var model = {
        IdOT : 0,
        Prioridad : Prioridad === undefined ? '' : Prioridad,
        CodPrioridad: CodPrioridad === undefined ? '' : CodPrioridad,
        TipoOT : TipoOT === undefined ? '' : TipoOT,
        CodTipoOT : CodTipoOT === undefined ? '' : CodTipoOT,
        Granja : Granja === undefined ? '' : Granja,
        Centro : Centro === undefined ? '' : Centro,
        Area : Area === undefined ? '' : Area,
        CodArea : CodArea === undefined ? '' : CodArea,
        Sala : Sala === undefined ? '' : Sala,
        Equipo : Equipo === undefined ? '' : Equipo,
        CodEquipo : CodEquipo === undefined ? '' : CodEquipo,
        Grupo : Grupo === undefined ? '' : Grupo,
        Actividad : Actividad === undefined ? '' : Actividad,
        Materiales: Materiales === undefined ? '' : Materiales,
        Estatus : Estatus === undefined ? '' : Estatus,
        CodEstatus : CodEstatus === undefined ? '' : CodEstatus,
        Tecnico1 : Tecnico1 === undefined ? '' : Tecnico1,
        Tecnico2 : Tecnico2 === undefined ? '' : Tecnico2,
        Tecnico3 : Tecnico3 === undefined ? '' : Tecnico3,
        Tecnico4 : Tecnico4 === undefined ? '' : Tecnico4,
        Tecnico5 : Tecnico5 === undefined ? '' : Tecnico5,
        TipoEvento : TipoEvento === undefined ? '' : TipoEvento,
        CodEvento: CodEvento === undefined ? '' : CodEvento,
        LstImagenes: objGuardar.FileName === undefined ? '' : objGuardar.FileName
      
      }
      // console.log('MODEL')
      console.log('model otService',model)

      this.http.post(`${environment.urlApiOrdenesTrabajo}/OT/Guardar`, JSON.stringify(model), options).subscribe((data) =>{
        resolve(data)
      }, error =>{
        reject(error);
      })
    })
  }

  guardarOTOnline(objGuardar){
    // debugger;
    console.log('servicio', objGuardar)
    const options ={
      headers: new HttpHeaders().append('Content-Type','application/json; charset=utf-8')
    }
    return new Promise((resolve, reject) => {
      
      var model ={
        Prioridad : objGuardar.prioridad === undefined ? '' : objGuardar.prioridad,
        CodPrioridad: objGuardar.codPrioridad === undefined ? '' : objGuardar.codPrioridad,
        TipoOT : objGuardar.tipo === undefined ? '' : objGuardar.tipo,
        CodTipoOT : objGuardar.codTipoOt === undefined ? '' : objGuardar.codTipoOt,
        Granja : objGuardar.granja.nombre === undefined ? '' : objGuardar.granja.nombre,
        Centro : objGuardar.granja.Centro === undefined ? '' : objGuardar.granja.Centro,
        Area : objGuardar.area.AreaDesc === undefined ? '' : objGuardar.area.AreaDesc,
        CodArea : objGuardar.area.Area === undefined ? '' : objGuardar.area.Area,
        Sala : objGuardar.sala === undefined ? '' : objGuardar.sala,
        Equipo : objGuardar.equipo.Equipo === undefined ? '' : objGuardar.equipo.Equipo,
        CodEquipo : objGuardar.equipo.CodEquipo === undefined ? '' : objGuardar.equipo.CodEquipo,
        Grupo : objGuardar.equipo.Grupo === undefined ? '' : objGuardar.equipo.Grupo,
        Actividad : objGuardar.actividad === undefined ? '' : objGuardar.actividad.value,
        Materiales: objGuardar.materiales === undefined ? '' : objGuardar.materiales.value,
        Estatus : objGuardar.estatus === undefined ? '' : objGuardar.estatus,
        CodEstatus : objGuardar.codEstatus === undefined ? '' : objGuardar.codEstatus.value,
        Tecnico1 : objGuardar.tecnico1 === undefined ? '' : objGuardar.tecnico1.nombre,
        Tecnico2 : objGuardar.tecnico2 === undefined ? '' : objGuardar.tecnico2.nombre,
        Tecnico3 : objGuardar.tecnico3 === undefined ? '' : objGuardar.tecnico3.nombre,
        Tecnico4 : objGuardar.tecnico4 === undefined ? '' : objGuardar.tecnico4.nombre,
        Tecnico5 : objGuardar.tecnico5 === undefined ? '' : objGuardar.tecnico5.nombre,
        TipoEvento : objGuardar.evento === undefined ? '' : objGuardar.evento,
        CodEvento: objGuardar.codEvento === undefined ? '' : objGuardar.codEvento.value
        ,LstImagenes: objGuardar.lstImagenes === undefined ? '' : objGuardar.lstImagenes
      }
      this.http.post(`${environment.urlApiOrdenesTrabajo}/OT/Guardar`, JSON.stringify(model), options).subscribe((data) =>{
        resolve(data)
      }, error =>{
        reject(error);
      })
    })
  }

  guardarImagen(base){
    const options ={
      headers: new HttpHeaders().append('Content-Type','application/json; charset=utf-8')
    }
    return new Promise((resolve, reject) => {
    this.http.post(`${environment.urlApiOrdenesTrabajo}/OT/imagen`,JSON.stringify(base),options).subscribe((data) =>{
      resolve(data)
    }, error =>{
      reject(error);
    })
    })
  }

  // cargarCSV(){

  //   let promise = new Promise((resolve, reject) =>{
  //     this.http.get(`${environment.urlApiOrdenesTrabajo}/OT/CargarCSV`).toPromise().then(
  //       res =>{
  //         this.lstCSV = res ;               
  //         resolve( res );
  //       },
  //       msg => {
  //         reject (msg);
  //       }
  //     )
  //   });
  //   return promise;
  // }




}
