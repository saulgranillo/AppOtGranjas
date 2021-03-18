import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import {catEquipo, tablasSQLite} from './tablasSqLite';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  public database: SQLiteObject;
  
  constructor(private sqlite: SQLite,
              // private storage: SQLiteObject,
              ) { }


  crearCatOT(){
    this.sqlite.create({
      name: 'ordenTrabajo.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
    
    
        db.executeSql(tablasSQLite, [])
          .then(() =>
           console.log ('Executed SQL')
           )
          .catch(e => 
            console.log(e)
            );
    
          this.database = db;
        
      })
      .catch(e => 
        console.log(e)
        );

  }

  // crearCatEquipo(){
  //   this.database.open()
  //   this.database.executeSql(catEquipo);

  // }

  getData(){
    return new Promise((resolve, reject) =>{
      this.database.executeSql(`CREATE TABLE IF NOT EXISTS CatEquipo(
        IdEquipo INTEGER PRIMARY KEY NOT NULL,
        Descripcion TEXT,
        Codigo TEXT,
        GpoEquipo TEXT
        );`,[]).then((data) => {
          
          console.log('resolve');

        }, (error) =>{
          reject(error);
        })
    });
  }

 
  // async guardarVenta(objGuardar:any) {
  //   console.log("Documento a guardar >> ", objGuardar);
  //   let sqlcmd = `
  //     INSERT INTO EncDocumentos(
      
  //     ) VALUES(
  //       0, ${this.getValueString(documento.IdEncDocumentoUUID)}, ${documento.ObjModTipoDocumento.IdTipoDocumento},
  //       ${documento.ObjModCliente.IdCliente}, ${documento.ObjModSucursal.IdSucursal}, ${documento.usuario.idUsuario},
  //       ${documento.ObjModMoneda.IdMoneda}, ${documento.ObjModVendedor.IdVendedor}, ${this.getValueString(documento.StrFechaCreacion)},
  //       ${this.getValueString(documento.StrFechaCreacion)}, ${this.getValueString(documento.StrFechaCancelacion)},
  //       ${this.getValueString(documento.ObjModCnfFolios.Serie)}, ${this.getValueString(documento.ObjModCnfFolios.FolioActual)},
  //       ${this.getValueString(documento.ObjModMoneda.CodMoneda)}, ${this.getValueString(documento.ObjModMoneda.Moneda)},
  //       ${documento.ObjModMoneda.TipoCambio}, ${this.getValueString(documento.MetodoPago)}, "A", "N", "N",
  //       ${documento.Importe}, ${documento.Descuento}, ${documento.SubTotal}, ${documento.IVATotal}, ${documento.IVATotal},
  //       ${documento.IvaRetencion}, ${documento.ISRRetencion}, ${documento.TotalSinRedondeo}, ${this.getValueString(documento.TipoFactura)},
  //       ${documento.Pagado}, ${documento.MontoPagado}, ${this.getValueString(documento.FechaVencimiento)}, ${documento.Parcialidad},
  //       ${documento.ObjModFormaPago.IdFormaPago || null}, null, null, ${documento.IdEncCorte}, ${this.getValueString(documento.UUIDEncCorte)},
  //       0, ${documento.Redondeo}, 1, null, ${documento.IdEncPedidoWeb},0,${"'" + this.objectToStringSqlite(documento) + "'"}
  //     );
  //   `;
    
  //   console.log("Query guardar venta ejecutar >> ", sqlcmd);
  //   this.storage.executeSql( sqlcmd )
  //   .then(() => console.log('Executed SQL'))
  //   .catch(e => console.log(e));
  // }

  
}
