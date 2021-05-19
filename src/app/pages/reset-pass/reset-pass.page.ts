import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.page.html',
  styleUrls: ['./reset-pass.page.scss'],
})
export class ResetPassPage implements OnInit {

  ionicForm: FormGroup;

  constructor(
     private usrService : UsuarioService
    ,private formBuilder : FormBuilder
    ,private alertCtrl : AlertController
  ) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  resetPass(){
    let objReset ={
      email: this.ionicForm.value.email
    }
    
    this.usrService.resetPass(objReset).then((data:any) =>{
      if(data.message){
        console.log('enviee el correo')
        this.ionicForm.reset();
        this.alertaEnviado(data.message)
      }
    }).catch((error:any) =>{
      console.log(error)
      this.alertaError(error.error.message)
    })
    
  }

  async alertaEnviado(err){
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: err,
      buttons: ['OK']
    });
    await alert.present();
  }

  async alertaError(err){
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: err,
      buttons: ['OK']
    });
    await alert.present();
  }

}
