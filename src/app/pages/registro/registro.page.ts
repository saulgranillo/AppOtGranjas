import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { UsuarioService } from '../../services/usuario.service';
import { AlertController, NavController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  email: string = ""
  pass: string = ""
  confPass: string = ""
  numEmp: number = 0
  rfc: string = ""
  curp: string = ""

  //validadores
  ionicForm: FormGroup
  registroForm: any;
  constructor(private formBuilder: FormBuilder
    , private usrService: UsuarioService
    , private alertCtrl: AlertController
    , private navCtrl : NavController) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(8)]],
      numEmp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      rfc: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      curp: ['', [Validators.required, Validators.minLength(18), Validators.maxLength(18)]]
    })
  }

  back(){
    // this.navCtrl.navigateBack('/login')
    this.navCtrl.pop()
  }

  inputEmail(event) {
    console.log(event.detail)
    this.email = event.detail
  }

  inputPass(event) {
    console.log(event.detail)
    this.pass = event.detail
  }

  inputConfPass(event) {
    console.log(event.detail)
    this.confPass = event.detail
  }

  inputNumEmp(event) {
    console.log(event.detail)
    this.numEmp = event.detail
  }

  inputRfc(event) {
    console.log(event.detail)
    this.rfc = event.detail
  }

  inputCurp(event) {
    console.log(event.detail)
    this.curp = event.detail
  }

  registrar() {
    var objModel = {
      email: this.email,
      password: this.pass,
      password_confirmation: this.confPass,
      empleado: this.numEmp,
      rfc: this.rfc,
      curp: this.curp
    }

    console.log(objModel)
    console.log('elform', this.ionicForm.valid)
    if (this.ionicForm.valid) {
      this.usrService.registro(objModel).then((result: any) => {
        if (result.user.id >0) {
          this.alertaRegistrar();
        }
      }).catch((error: any) => {
        this.alertaErrorRegistrar();
      })
    }else{
      this.alertaValidarForm();
    }
  }

  async alertaError(err) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: err.exception,
      buttons: ['OK']
    });
    await alert.present();
  }

  async alertaValidarForm() {
    const alert = await this.alertCtrl.create({
      // cssClass: 'my-custom-class',
      header: 'Error',
      // subHeader: 'Para continuar',
      message: 'Favor de llenar todos los campos.',
      buttons: ['OK']
    });
    await alert.present();
  }
  
  async alertaErrorRegistrar() {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'Se produjo un error en la alta.',
      buttons: ['OK']
    });
    await alert.present();
  }
  
  async alertaRegistrar() {
    const alert = await this.alertCtrl.create({
      header: 'Exito',
      message: 'Se agregó correctamente.',
      buttons: ['OK']
    });
    await alert.present();
  }


}
