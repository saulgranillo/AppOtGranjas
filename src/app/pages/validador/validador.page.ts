import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AgregarOTService } from '../../services/agregar-ot.service';
import { SqliteService } from '../../services/sqlite.service';
import { HttpClient } from '@angular/common/http';
import { Papa } from 'ngx-papaparse';
import { Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';


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

  csvData: any[] = [];
  headerRow: any[] = [];
  // exportar excel
  // https://www.youtube.com/watch?v=tyZjicNtbyk
  constructor(public formBuilder: FormBuilder, 
              private otService : AgregarOTService, 
              private sqlService : SqliteService,
              private http: HttpClient,
              private papa: Papa,
              private platform: Platform,
              private files: File,
              private socialSharing: SocialSharing) { }

  ngOnInit() {
    // validador del FORMS
    // console.log(this.isSubmitted)
    // this.ionicForm = this.formBuilder.group({
    //   name: ['', [Validators.required, Validators.minLength(2)]],
    //   email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    //   dob: [this.defaultDate],
    //   mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    // })
this.loadCSv();
   
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

  // excel
  private loadCSv(){
   this.http.get('./assets/test.csv', {responseType:'text'}).subscribe(
     data => this.extractData(data),
     err => console.log('error',err)
   )
  }

  extractData(res){
    let csvData = res || '';

    this.papa.parse(csvData,{
      complete: parsedData =>{
        console.log('asi llega',parsedData)
        console.log(parsedData.data.splice(0,0) [0]);
        this.headerRow = parsedData.data.splice(0,1)[0];
        console.log('header',this.headerRow)
        this.csvData = parsedData.data;
        console.log('arreglo',this.csvData)
      }
    })
  }
// para poder modificar mas de 1 caracter en la tabla
  trackByFn(index:any, item:any){
    return index;
  }

  exportCSV(){
    let csv = this.papa.unparse({
      fields: this.headerRow,
      data: this.csvData
    });
    console.log('csv', csv)

    if (this.platform.is('cordova')) {
      this.files.writeFile(this.files.dataDirectory,'data.csv',csv,{replace:true}).then(res =>{
        this.socialSharing.share(null,null,res.nativeURL,null);
      });
    }else{
      var blob = new Blob([csv]);
      var a = window.document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = 'newdata.csv';
      a.click();
      document.body.removeChild(a);
    }
  }
}
