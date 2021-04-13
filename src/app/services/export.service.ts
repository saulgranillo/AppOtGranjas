import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

// import { FileOpener } from '@ionic-native/file-opener/ngx';

import {File, FileEntry} from "@ionic-native/file/ngx";
import { Platform } from '@ionic/angular';
import { Observable, fromEvent,merge,of } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ExportService {

  public appIsOnline$: Observable<boolean>;

  constructor(private files : File,
      	      private platform : Platform
              // ,private fileOpn : FileOpener
              ) 
              {
                // this.initConnectivityMonitoring();
               }

  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';

  public exportExcel(jsonData: any[], 
                     fileName: string, 
                     deleteCols: void
                    ) {

    jsonData = this.eliminarNoEncontrado(jsonData, deleteCols);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);

    //ws['!cols'][1] = { hidden: true };
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, fileName);
  }

  eliminarNoEncontrado(jsonData: any[], deleteCols) {

    if (deleteCols != null && deleteCols.length > 0) {
      jsonData.forEach(element => {
        deleteCols.forEach(col => {

          delete element[col];
        });

      });
    }

    return jsonData;
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    
    if(this.platform.is("cordova")|| this.platform.is("ios") || this.platform.is("android") ){
      const data: Blob = new Blob([buffer], { type: this.fileType });
      this.files.writeFile(this.files.externalRootDirectory + "/Download", fileName, data, { replace: true }).then((fileEntry: FileEntry) => {
        console.log("file created");
        //   // abrir en automatico (instalar plugin)
      // this.fileOpn.open(fileEntry.toURL(), data.type)
      //   .then(() => {
      //     console.log('FIle abierto')
      //   }).catch(err => console.log('error abriendo ' + err))
  
      }).catch((err) => {
        console.log('error creando el archivo' + err)
      });
  
    }
    else{
      const data: Blob = new Blob([buffer], { type: this.fileType });
      FileSaver.saveAs(data, fileName + this.fileExtension);   
    }
    // const data: Blob = new Blob([buffer], { type: this.fileType });
    // // FileSaver.saveAs(data, fileName + this.fileExtension);
    // // new Blob(buffer)
    // this.files.writeFile(this.files.externalRootDirectory + "/Download", fileName, data, { replace: true }).then((fileEntry: FileEntry) => {
    //   console.log("file created");

    
  }

  // private initConnectivityMonitoring() {

  //   if (!window || !navigator || !('onLine' in navigator)) return;

  //   this.appIsOnline$ = merge(
  //     of(null),
  //     fromEvent(window, 'online'),
  //     fromEvent(window, 'offline')
  //   ).pipe(map(() => navigator.onLine))

  // }
}
