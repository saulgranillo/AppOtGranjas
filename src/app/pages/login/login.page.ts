import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms'
import { UsuarioService } from '../../services/usuario.service';
import { AlertController, ModalController, MenuController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { RegistroPage } from '../registro/registro.page';
import { Network } from '@ionic-native/network/ngx';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email : any = "";
  password : string ="";
  backbutton : any;
  // validadores
  ionicForm: FormGroup;

  constructor(private formBuilder : FormBuilder
              ,private usrService : UsuarioService
              ,private alertCtrl : AlertController
              ,private storage : NativeStorage
              ,private router : Router
              ,private modalCtrl : ModalController
              ,private menuCtrl : MenuController
              ,private network : Network
              ) { }

  ngOnInit() {
  
    this.ionicForm = this.formBuilder.group({
      
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
    // this.validarToken();
    console.log('ENRE AL LOGIN PRIMERO')
    this.closeMenu();
  }

  ionViewWillEnter(){
    if (this.network.type === "none") {
      this.router.navigate(['/inicio'])
      return
    }
   this.validarToken();
   
  }

  ionViewWillLeave(){
   this.ionicForm.reset();
  }
 
  closeMenu(){
    this.menuCtrl.close();
  }

  login() {

    let objLogin = {
      email: this.ionicForm.value.email,
      password: this.ionicForm.value.password
    }

    console.log(this.ionicForm.value, 'objLOGIN')

    this.usrService.login(objLogin).then((result: any) => {
      if (result.access_token.length > 0) {

        //lo guardo en el storage
        // si esta guardado el token, paso a la pantalla de inicio

        this.storage.setItem('token', { token: result.access_token }).then((res) => {
          console.log('Stored ITEM!!', res)
          this.ionicForm.reset();
          // this.modalCtrl.dismiss();
          this.router.navigateByUrl('/inicio');
        }).catch(error => {
          console.log(error)
        })

      }

    }).catch((error: any) => {
      console.log(error)
      this.alertaError();

    })
  }

  validarToken(){
    this.storage.getItem('token')
    .then((data) => {
      if(data.token.length > 0){
        var dumbToken = data.token + "a"
        this.usrService.userProfile(data.token).then((data) =>{
          console.log('ME autentifique 😎',data)
          this.router.navigate(['/inicio'])
        }).catch((error) =>{
          console.log('userError',error.message)
          // this.alertaErrorDesautenticado(error)
          this.alertaIniciarSesion();
        })
      }
    }).catch((error:any)=>{
      console.log(error)
      //Una alerta para que inicie sesion
    });
  }

  async modalRegistro(){
    // this.modalCtrl.dismiss()
    const modal = await this.modalCtrl.create({
      component: RegistroPage
    });
    await modal.present();
    const resp = await modal.onDidDismiss();
    console.log('Login Resp', resp)
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
  
  async alertaIniciarSesion() {
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      message: 'Favor de iniciar sesion',
      buttons: ['OK']
    });
    await alert.present();
  }
  
}





// ngAfterViewInit() {
    //  this.backbutton =
    //  this.platform.backButton.observers.pop();
  // }

  // ionViewWillLeave() {
  //   this.platform.backButton.observers.push(this.backbutton);
  // }

  // inputEmail(event){
  //   this.email = event.detail;
  //   console.log(this.email);
  // }

  // inputPass(event){
  //   this.password = event.detail;
  //   console.log(this.password);
  // }
