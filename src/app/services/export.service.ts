import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
// import { FileOpener } from '@ionic-native/file-opener/ngx';


import {File, FileEntry} from "@ionic-native/file/ngx";

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(private files : File
              // ,private fileOpn : FileOpener
              ) { }

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
    
    const data: Blob = new Blob([buffer], { type: this.fileType });
    // FileSaver.saveAs(data, fileName + this.fileExtension);
    // new Blob(buffer)
    this.files.writeFile(this.files.externalRootDirectory + "/Download", fileName, data, { replace: true }).then((fileEntry: FileEntry) => {
      console.log("file created");

      // this.fileOpn.open(fileEntry.toURL(), data.type)
      //   .then(() => {
      //     console.log('FIle abierto')
      //   }).catch(err => console.log('error abriendo ' + err))
    }).catch((err) => {
      console.log('error creando el archivo' + err)
    });
  }
}
