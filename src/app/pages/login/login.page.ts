import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms'
import { UsuarioService } from '../../services/usuario.service';
import { AlertController, ModalController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { RegistroPage } from '../registro/registro.page';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email : string = "";
  password : string ="";
  // validadores
  ionicForm: FormGroup;

  constructor(private formBuilder : FormBuilder
              ,private usrService : UsuarioService
              ,private alertCtrl : AlertController
              ,private modalCtrl : ModalController
              ,private storage : NativeStorage) { }

  ngOnInit() {
  
    this.ionicForm = this.formBuilder.group({
      
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  inputEmail(event){
    this.email = event.detail;
    console.log(this.email);
  }

  inputPass(event){
    this.password = event.detail;
    console.log(this.password);
  }
  login(){
    
    let objLogin = {
     email : this.email, 
     password : this.password
    }
    
    this.usrService.login(objLogin).then((result:any) =>{
      if (result.access_token.length >0 ) {
      //  result.user. //la propiedad que quiera acceder        
      //lo guardo en el storage

      // probar en el cel que si se guarde 
      // si esta guardado el token, paso a la pantalla de inicio
      this.setToken('token',result.access_token).then((result:any) =>{
        console.log(result)
      });

      }
  
    }).catch((error:any) =>{
      
      this.alertaError(error.error)
    })
  }

  async modalRegistro(){
    const modal = await this.modalCtrl.create({
      component : RegistroPage
    })
    await modal.present();
  }

  async alertaError(err) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: err.error,
      buttons: ['OK']
    });
    await alert.present();
  }

  public setToken(settingName,value){
    return this.storage.setItem(`setting:${ settingName }`,value);
  }
}
