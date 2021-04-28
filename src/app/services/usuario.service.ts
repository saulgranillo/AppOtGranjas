import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  registro(objRegistro) {
    let promise = new Promise((resolve, reject) => {

      var model = {
        email: objRegistro.email === undefined ? '' : objRegistro.email.value,
        password: objRegistro.password === undefined ? '' : objRegistro.password.value,
        password_confirmation: objRegistro.password_confirmation === undefined ? '' : objRegistro.password_confirmation.value,
        empleado: objRegistro.empleado === undefined ? '' : objRegistro.empleado.value,
        rfc: objRegistro.rfc === undefined ? '' : objRegistro.rfc.value,
        curp: objRegistro.curp === undefined ? '' : objRegistro.curp.value,
      }
      this.http.post(`${environment.urlApiAuthPrueba}/api/auth/register`, model).subscribe((data) => {
        resolve(data)
      }, error => {
        console.log(error);
        reject(error);

      });

    });
    return promise;
  }

  login(objLogin) {
    let promise = new Promise((resolve, reject) => {

      var model = {
        email: objLogin.email === undefined ? '' : objLogin.email.value,
        password: objLogin.password === undefined ? '' : objLogin.password.value,
        }
      this.http.post(`${environment.urlApiAuthPrueba}/api/auth/login`, model).subscribe((data) => {
        resolve(data)
      }, error => {
        console.log(error.error);
        reject(error);

      });

    });
    return promise;
  }

  userProfile(token) {

    const options ={
      headers: new HttpHeaders().append('Content-Type','application/json; charset=utf-8')
        .append('Accept','application/json')
        .append('Authorization', 'Bearer ' + token)
    }
    let promise = new Promise((resolve, reject) => {
 
      this.http.get(`${environment.urlApiAuthPrueba}/api/auth/user-profile`,options).subscribe((data) => {
        resolve(data)
        console.log(data);
      }, error => {
        console.log(error);
        reject(error);

      });

    });
    return promise;
  }

  logout(token){

    const options ={
      headers: new HttpHeaders().append('Content-Type','application/json; charset=utf-8')
        .append('Accept','application/json')
        .append('Authorization', 'Bearer ' + token)
    }
    let promise = new Promise((resolve, reject) => {
 
      this.http.get(`${environment.urlApiAuthPrueba}/api/auth/logout`,options).subscribe((data) => {
        resolve(data)
        console.log(data);
      }, error => {
        console.log(error);
        reject(error);

      });

    });
    return promise;
  }

  resetPass(objUsr){

    var model = {
      email: objUsr.email === undefined ? '' : objUsr.email,
      url: "http://norson16:8000/password/reset/",
      }
    let promise = new Promise((resolve, reject) => {
 
      this.http.post(`${environment.urlApiAuthPrueba}/api/auth/reset-password-request`,model).subscribe((data) => {
        resolve(data)
        console.log(data);
      }, error => {
        console.log(error);
        reject(error);

      });

    });
    return promise;
  }

  changePass(objUsr){

    var model = {
      token : objUsr.token === undefined ? '' : objUsr.token,
      email: objUsr.email === undefined ? '' : objUsr.email,
      password: objUsr.password === undefined ? '' : objUsr.password,
      password_confirmation: objUsr.password_confirmation === undefined ? '' : objUsr.password_confirmation,
      }
    let promise = new Promise((resolve, reject) => {
 
      this.http.post(`${environment.urlApiAuthPrueba}/api/auth/change-password`,model).subscribe((data) => {
        resolve(data)
        console.log(data);
      }, error => {
        console.log(error);
        reject(error);

      });

    });
    return promise;
  }

}
