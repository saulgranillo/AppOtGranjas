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

  obtenerAlbumes(){
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/albums');
  }

  cargarEquipoLista(){

    let promise = new Promise((resolve, reject) =>{
      this.http.get(`${environment.urlApiOrdenesTrabajo}/TodoItems/CargarEquipo`).toPromise().then(
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
      this.http.get(`${environment.urlApiOrdenesTrabajo}/OrdenesTrabajo/CargarPrioridad`).toPromise().then(
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
      this.http.get(`${environment.urlApiOrdenesTrabajo}/OrdenesTrabajo/CargarTipo`).toPromise().then(
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
      this.http.get(`${environment.urlApiOrdenesTrabajo}/OrdenesTrabajo/CargarArea`).toPromise().then(
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
      this.http.get(`${environment.urlApiOrdenesTrabajo}/OrdenesTrabajo/CargarGranja`).toPromise().then(
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
      this.http.get(`${environment.urlApiOrdenesTrabajo}/OrdenesTrabajo/CargarEstatus`).toPromise().then(
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
      this.http.get(`${environment.urlApiOrdenesTrabajo}/OrdenesTrabajo/CargarEvento`).toPromise().then(
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

  guardarOT(objGuardar:any){
    return new Promise ((resolve, reject) =>{
      var model = {
        IdOT : 0,
        Prioridad : objGuardar.prioridad === undefined ? '' : objGuardar.prioridad,
        CodPrioridad: objGuardar.codPrioridad === undefined ? '' : objGuardar.codPrioridad,
        TipoOT : objGuardar.tipo === undefined ? '' : objGuardar.tipo,
        CodTipoOT : objGuardar.codTipoOt === undefined ? '' : objGuardar.codTipoOt,
        Granja : objGuardar.granja.nombre === undefined ? '' : objGuardar.granja.nombre,
        Centro : objGuardar.granja.Centro === undefined ? '' : objGuardar.granja.Centro,
        Area : objGuardar.area.AreaDesc === undefined ? '' : objGuardar.area.AreaDesc,
        CodArea : objGuardar.area.Area === undefined ? '' : objGuardar.area.Area,
        Ubicacion : objGuardar.ubicacion === undefined ? '' : objGuardar.ubicacion.value,
        Equipo : objGuardar.equipo.Equipo === undefined ? '' : objGuardar.equipo.Equipo,
        CodEquipo : objGuardar.equipo.CodEquipo === undefined ? '' : objGuardar.equipo.CodEquipo,
        Grupo : objGuardar.equipo.Grupo === undefined ? '' : objGuardar.equipo.Grupo,
        Actividad : objGuardar.actividad === undefined ? '' : objGuardar.actividad.value,
        Materiales: objGuardar.materiales === undefined ? '' : objGuardar.materiales.value,
        Estatus : objGuardar.estatus === undefined ? '' : objGuardar.estatus,
        CodEstatus : objGuardar.codEstatus === undefined ? '' : objGuardar.codEstatus.value,
        Tecnico : objGuardar.tecnicos === undefined ? '' : objGuardar.tecnicos,
        TipoEvento : objGuardar.evento === undefined ? '' : objGuardar.evento,
        CodEvento: objGuardar.codEvento === undefined ? '' : objGuardar.codEvento.value
      }
      console.log('MODEL')
      console.log(model)
      this.http.post(`${environment.urlApiOrdenesTrabajo}/OrdenesTrabajo/Guardar`,model).subscribe((data) =>{
        resolve(data)
      }, error =>{
        reject(error);
      })
    })
  }




}
