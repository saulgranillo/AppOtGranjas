import { Component } from '@angular/core';

import { Platform, AlertController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UsuarioService } from './services/usuario.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  rootPage:any = '/inicioPage'
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
    ,private usrService: UsuarioService
    ,private storage: NativeStorage
    ,private alertCtrl : AlertController
    ,private router : Router
    ,private menuCtrl : MenuController

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
    
    });
  }



  getToken(){
    this.storage.getItem('token')
  .then((data) => {
    if(data.token.length > 0){
      console.log('Obtuve el token para cerrar sesion ',data.token)
      this.logOut(data.token)
    }
  }).catch((error:any)=>{
    console.log(error)
  });
  }


  logOut(token){
    console.log('cerrare sesion')
    this.usrService.logout(token).then((data:any) =>{
      console.log(data);
       if (data.message) {
         this.closeMenu();
         this.router.navigate(['/login'])
       }  
    }).catch((err) => {
      this.alertaErrorLogout(err)

    })
  }

  closeMenu(){
    this.menuCtrl.close();
  }

  async alertaErrorLogout(err) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: err.message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
