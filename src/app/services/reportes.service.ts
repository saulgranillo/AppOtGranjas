import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  lstCSV : any;
  lstXFechas : any;

  constructor(private http : HttpClient) { }

  cargarCSV(){

    let promise = new Promise((resolve, reject) =>{
      this.http.get(`${environment.urlApiOrdenesTrabajo}/OT/CargarCSV`).toPromise().then(
        res =>{
          this.lstCSV = res ;               
          resolve( res );
        },
        msg => {
          reject (msg);
        }
      )
    });
    return promise;
  }

  cargarXFechas(fechaIni,fechaFin){
    var model = {
      fechaInicio : fechaIni,
      fechaFin : fechaFin
    }

    let promise = new Promise((resolve, reject) =>{
      this.http.post(`${environment.urlApiOrdenesTrabajo}/OT/CargarXFechas`,model).toPromise().then(
        (res:any) =>{
          this.lstXFechas = res ;               
          resolve( res );
        },
        msg => {
          reject (msg);
        }
      )
    });
    return promise;
  }
}
