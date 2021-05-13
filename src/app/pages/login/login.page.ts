import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms'
import { UsuarioService } from '../../services/usuario.service';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';


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
              ,private storage : NativeStorage
              ,private router : Router) { }

  ngOnInit() {
  
    this.ionicForm = this.formBuilder.group({
      
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })

    // this.validarToken();
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
      //lo guardo en el storage
      // si esta guardado el token, paso a la pantalla de inicio
        // this.setToken(result.access_token);

        this.storage.setItem('token', {token: result.access_token}).then((res) =>{
          console.log('Stored ITEM!!',res)
          this.router.navigate(['/inicio']);
        }).catch(error =>{
          console.log(error)
        })

      }
  
    }).catch((error:any) =>{
      console.log(error)
     this.alertaError();
      
    })
  }

  validarToken(){
    this.storage.getItem('token')
    .then((data) => {
      if(data.token.length > 0){
        var dumbToken = data.token + "a"
        this.usrService.userProfile(dumbToken).then((data) =>{
          console.log('userProfile',data)
          this.router.navigate(['/inicio'])
        }).catch((error) =>{
          console.log('userError',error.message)
          this.alertaErrorDesautenticado(error)
        })
      }
    }).catch((error:any)=>{
      console.log(error)
      //Una alerta para que inicie sesion
    });
  }

  async alertaError() {
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      message: 'Verificar sus datos de inicio',
      buttons: ['OK']
    });
    await alert.present();
  }

  async alertaErrorDesautenticado(err) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: err.message,
      buttons: ['OK']
    });
    await alert.present();
  }
  
}
