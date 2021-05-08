import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms'
import { UsuarioService } from '../../services/usuario.service';
import { AlertController, ModalController } from '@ionic/angular';
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
              ,private storage : NativeStorage) { }

  ngOnInit() {
  
    this.ionicForm = this.formBuilder.group({
      
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })

    this.getToken();
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

        this.setToken(result.access_token);
    
      }
  
    }).catch((error:any) =>{
      
      this.alertaError(error.error)
    })
  }

  setToken(value){
    this.storage.setItem('token', {token: value})
  .then(
    () => console.log('Stored item!'),
    error => console.error('Error storing item', error)
  );

  }

  getToken(){
    this.storage.getItem('token')
  .then((data) => {
    if(data.token.length > 0){
      console.log(data.token)
    }
  }).catch((error:any)=>{
    console.log(error)
  });
  }

  validarToken(){
    this.storage.getItem('token')
    .then((data) => {
      if(data.token.length > 0){
        this.usrService.userProfile(data.token).then((data) =>{
          console.log('userProfile',data)
        }).catch((error) =>{
          console.log('userError',error.message)
        })
      }
    }).catch((error:any)=>{
      console.log(error)
    });
  }

  async alertaError(err) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: err.error,
      buttons: ['OK']
    });
    await alert.present();
  }
  
}
