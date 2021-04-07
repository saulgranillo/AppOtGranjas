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

  guardarOTdesdeSql(objGuardar:any){
    // JSON.stringify(objGuardar);
    var Prioridad = objGuardar[0].Prioridad 
    var CodPrioridad = objGuardar[0].CodPrioridad
    var TipoOT = objGuardar[0].TipoOT
    var CodTipoOT = objGuardar[0].CodTipoOT
    var Granja = objGuardar[0].Granja
    var Centro = objGuardar[0].Centro
    var Area = objGuardar[0].Area
    var CodArea = objGuardar[0].CodArea
    var Sala = objGuardar[0].Sala
    var Equipo = objGuardar[0].Equipo
    var CodEquipo = objGuardar[0].CodEquipo
    var Grupo = objGuardar[0].Grupo 
    var Actividad = objGuardar[0].Actividad
    var Materiales = objGuardar[0].Materiales
    var Estatus = objGuardar[0].Estatus
    var CodEstatus = objGuardar[0].CodEstatus
    var Tecnico1 = objGuardar[0].Tecnico1
    var Tecnico2 = objGuardar[0].Tecnico2
    var Tecnico3 = objGuardar[0].Tecnico3
    var Tecnico4 = objGuardar[0].Tecnico4
    var Tecnico5 = objGuardar[0].Tecnico5
    var TipoEvento = objGuardar[0].TipoEvento
    var CodEvento = objGuardar[0].CodEvento


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
        CodEvento: CodEvento === undefined ? '' : CodEvento
      
      }
      console.log('MODEL')
      console.log(model)

      this.http.post(`${environment.urlApiOrdenesTrabajo}/OT/Guardar`,model).subscribe((data) =>{
        resolve(data)
      }, error =>{
        reject(error);
      })
    })
  }

  guardarOTOnline(objGuardar){
    console.log('servicio', objGuardar)

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
      }
      this.http.post(`${environment.urlApiOrdenesTrabajo}/OT/Guardar`,model).subscribe((data) =>{
        resolve(data)
      }, error =>{
        reject(error);
      })
    })
  }




}
