import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AgregarOTService } from '../../services/agregar-ot.service';
import { SqliteService } from '../../services/sqlite.service';


@Component({
  selector: 'app-validador',
  templateUrl: './validador.page.html',
  styleUrls: ['./validador.page.scss'],
})
export class ValidadorPage implements OnInit {
  
  ionicForm: FormGroup;
  defaultDate = "1987-06-30";
  isSubmitted = false;
  lstEquipo: any[] = [];


  constructor(public formBuilder: FormBuilder, private otService : AgregarOTService, private sqlService : SqliteService) { }

  ngOnInit() {
    console.log(this.isSubmitted)
    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      dob: [this.defaultDate],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })

    this.cargarEquipo();
  }

  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.ionicForm.get('dob').setValue(date, {
      onlyself: true
    })
  }

  get errorControl() {
    console.log('getErrorcontrol')
    console.log(this.ionicForm.controls)
    return this.ionicForm.controls;
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.ionicForm.value)
    }
  }

  cargarEquipo() {

    this.otService.cargarEquipoLista().then((equipo: []) => {
      this.lstEquipo = equipo.concat();
      console.log(this.lstEquipo);
    });
  }


}
