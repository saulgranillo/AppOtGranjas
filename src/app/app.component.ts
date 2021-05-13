import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UsuarioService } from './services/usuario.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
    ,private usrService: UsuarioService
    ,private storage: NativeStorage
   
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
      console.log(data.token)
      this.usrService.userProfile(data.token)
    }
  }).catch((error:any)=>{
    console.log(error)
  });
  }


  logOut(){
    console.log('cerrare sesion')
    this.usrService.logout()
  }

}
