import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { UsuarioService } from '../../services/usuario.service';
import { AlertController, NavController } from '@ionic/angular';
// import { ErrorStateMatcher } from '@angular/material/core';

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
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder
    , private usrService: UsuarioService
    , private alertCtrl: AlertController
    , private navCtrl : NavController) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(8)]],
      confirmPass: [''],
      numEmp: ['', [Validators.required, Validators.minLength(6)]], //, Validators.maxLength(6)
      rfc: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      curp: ['', [Validators.required, Validators.minLength(18), Validators.maxLength(18)]]
    }, {validators: this.validarPasswords }) //<- valido que sean iguales los pass
  
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

  
  validarPasswords(group : FormGroup){
    const pass = group.get('pass').value;
    const confPass = group.get('confirmPass').value;
    
    // console.log('el PASSWORD',pass)
    // console.log('confirmPass',confPass)

    // valido pass que sean iguales
    return pass === confPass ? null : {notSame: true}
  }

  reset(){
    this.ionicForm.reset();
  }

  // validaPass(){
    
  //   if(this.ionicForm.controls.pass.value == this.ionicForm.controls.confirmPass.value){
  //     console.log('iguales')
  //   }
  //   else{
  //     console.log('diferentes')
  //   }
  // }

  registrar() {
    var objModel = {
      email: this.email,
      password: this.pass,
      password_confirmation: this.confPass,
      empleado: this.numEmp,
      rfc: this.rfc,
      curp: this.curp
    } 
    // console.log(objModel)
    
    this.isSubmitted = true;
    if (this.ionicForm.errors != null ) {
      this.alertaContraseñas();
      return
    }
    console.log('elform', this.ionicForm.valid)
    // this.validaPass();
    if (this.ionicForm.valid) {
      this.usrService.registro(objModel).then((result: any) => {
        if (result.user.id >0) {
          this.ionicForm.reset();
          this.alertaRegistrar();
        }
      }).catch((error: any) => {
        if(error.error.empleado){
          this.alertaErrorNoexiste(error)
          return 
        }
       else if (error.error.email) {
          this.alertaErrorEmail(error)
          return
        }
        else if(error.error.rfc){
          this.alertaErrorRfc(error);
          return
        }
        else if(error.error.curp){
          this.alertaErrorCurp(error)
          return
        }
      
        this.alertaErrorRegistrar();
      
      })
    }else{
      this.alertaValidarForm();
    }
  }

  get errorCtrl() {
    console.log(this.ionicForm.controls)
    return this.ionicForm.controls;
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
  
  async alertaErrorNoexiste(error) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: error.error.empleado ,
      buttons: ['OK']
    });
    await alert.present();
  }

  async alertaErrorCurp(error) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: error.error.curp ,
      buttons: ['OK']
    });
    await alert.present();
  }

  async alertaErrorEmail(error) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: error.error.email ,
      buttons: ['OK']
    });
    await alert.present();
  }

  async alertaErrorRfc(error) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: error.error.rfc ,
      buttons: ['OK']
    });
    await alert.present();
  }

  async alertaContraseñas() {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'Contraseñas no coinciden.',
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

  // error.error.curp
  // error.error.email
  // error.error.rfc


}

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
//     const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);

//     return invalidCtrl || invalidParent;
//   }
// }
