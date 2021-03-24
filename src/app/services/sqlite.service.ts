import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { catOT, CatEquipo, CatEstatus, CatPrioridad, CatTipo, CatTipoEvento } from './tablasSqLite';
import { AgregarOTService } from './agregar-ot.service';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  public database: SQLiteObject;
  
  constructor(private sqlite: SQLite,
              // private storage: SQLiteObject,
              private otService : AgregarOTService
              ) { }
lstTipo: any[] = [];

  crearCatOT(){
    this.sqlite.create({
      name: 'ordenTrabajo.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
    
    
        db.executeSql(catOT, [])
          .then(() =>
           console.log ('Executed SQL')
           )
          .catch(e => 
            console.log(e)
            );
    
          this.database = db;

          db.executeSql(CatEquipo);
          db.executeSql(CatEstatus);
          db.executeSql(CatPrioridad);
          db.executeSql(CatTipo);
          db.executeSql(CatTipoEvento);

          
        
      })
      .catch(e => 
        console.log(e)
        );

  }


//   catTipoSync(){
//     this.otService.cargarTipoLista().then((tipo:[]) =>{
//       this.lstTipo = tipo.concat(); 
//       //  console.log(this.lstTipo)
//       this.guardarCatTipo(this.lstTipo);
//     });
//   }

//   async guardarCatTipo(lst){
//     console.log("guardare", lst);
// for (let index = 0; index < lst.length; index++) {
//   // const element = array[index];
  
 
//     let sqlcmd = `
//     INSERT INTO CatTipo()
//       VALUES(
//         ${lst[index].Tipo},  ${lst[index].Codigo}
//       );
//       `;
//     console.log("Query a ejecutar", sqlcmd);
//     this.database.executeSql(sqlcmd)
//     .then(() => console.log('se ejecuto sql??'))
//     .catch(e => console.log(e));
//   }
  // }

 


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
