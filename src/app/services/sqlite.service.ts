import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { catOT, CatEquipo, CatEstatus, CatPrioridad, CatTipo, CatTipoEvento, CatArea, CatGranja } from './tablasSqLite';
import { AgregarOTService } from './agregar-ot.service';
import { Platform } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  public database: SQLiteObject;
  
  constructor(private sqlite: SQLite,
              // private storage: SQLiteObject,
              private otService : AgregarOTService,
              private platform : Platform
              ) { }

lstTipo: any[] = [];
lstEstatus: any[] = [];
lstEvento: any[] = [];
lstArea: any[] = [];
lstGranja: any[] = [];
lstEquipo: any[] = [];

crearDB(){
  return new Promise((resolve, reject) => {
    if (this.platform.ready) {
      this.sqlite.create({
        name: 'ordenTrabajo.db',
        location: 'default'
      }).then((db : SQLiteObject) =>{
        console.log('CREE DB');
        this.database = db;
        console.log('creareTablas')

        console.log('CatOT');
        this.database.executeSql(catOT,[]);
        console.log('CatEquipo');
        this.database.executeSql(CatEquipo);
        console.log('CatEstatus');
        this.database.executeSql(CatEstatus);
        console.log('CatPrioridad');
        this.database.executeSql(CatPrioridad);
        console.log('CatTipo');
        this.database.executeSql(CatTipo);
        console.log('CatTipoEvento');
        this.database.executeSql(CatTipoEvento);      
        console.log('CatArea')
        this.database.executeSql(CatArea);   
        console.log('CatGranja')
        this.database.executeSql(CatGranja);     
        console.log('Cree las tablas')

      }).catch( e => 
        console.log(e));
    
    };
    resolve(true),
      (error) => {
        reject(error)
      }

  });

}

  // crearTablas(){
  //   console.log('entre a crear Tablas')

  //   return new Promise((resolve, reject) =>{
  //     if (this.platform.ready) {

  //       console.log('CatOT');
  //       this.database.executeSql(catOT,[]);
  //       console.log('CatEquipo');
  //       this.database.executeSql(CatEquipo);
  //       console.log('CatEstatus');
  //       this.database.executeSql(CatEstatus);
  //       console.log('CatPrioridad');
  //       this.database.executeSql(CatPrioridad);
  //       console.log('CatTipo');
  //       this.database.executeSql(CatTipo);
  //       console.log('CatTipoEvento');
  //       this.database.executeSql(CatTipoEvento);      
  //       console.log('Cree las tablas')
  //     }
  //     resolve(true),
  //     (error) =>{
  //       reject(error)
  //     }
  //   });
    
    
  // }

  //  catTipoOTService(){
  //   this.otService.cargarTipoLista().then((tipo:[]) =>{
  //     this.lstTipo = tipo.concat(); 
  //     //  console.log(this.lstTipo)
  //     this.insertarCatTipo(this.lstTipo);
  //   });
  // }

  insertarCatTipo_Sql() {
    // console.log('estoy en el isntartar')

    this.database.executeSql('DROP TABLE CatTipo ');
    this.database.executeSql(CatTipo);
    // console.log('elimine y cree Cattipo')
    this.otService.cargarTipoLista().then((tipo: []) => {
      this.lstTipo = tipo.concat();
      // console.log(this.lstTipo);
    });

    return new Promise((resolve, reject) => {
      var lst = this.lstTipo;
      for (let i = 0; i < lst.length; i++) {
        let datos = [lst[i].Tipo, lst[i].Codigo]
        this.database.executeSql(`INSERT INTO CatTipo(Tipo,Codigo) VALUES(?,?)`, datos).then((data) => {
          console.log('inserte', data)
          resolve(datos);
        }, (error) => {
          reject(error);
        })
      }

    });
  }

   selectCatTipo_Sql() {
    //  console.log('Entre al select');
     return new Promise((resolve, reject) => {
       this.database.executeSql('SELECT * FROM CatTipo', []).then((data) => {
         let items = [];
         if (data.rows.length > 0) {
           for (let i = 0; i < data.rows.length; i++) {
             items.push({
               id: data.rows.item(i).IdTipo,
               Tipo: data.rows.item(i).Tipo,
               Codigo: data.rows.item(i).Codigo
             })
           }
         }
        //  console.log('items',items)
         resolve(items);

       }, (error) => {
         reject(error);
       })
     });
   
  }

  insertarCatEst_Sql() {
    // console.log('insert Estatus')
    
    this.database.executeSql('DROP TABLE CatESTATUS ');
    this.database.executeSql(CatEstatus);
    // console.log('elimine y cree estatus')

    this.otService.cargarEstatusLista().then((estatus: []) => {
      this.lstEstatus = estatus.concat();
    });

    return new Promise((resolve, reject) => {
      var lst = this.lstEstatus;
      for (let i = 0; i < lst.length; i++) {
        let datos = [lst[i].Estatus, lst[i].Estado]
        this.database.executeSql(`INSERT INTO CatEstatus(Estatus,Estado) VALUES(?,?)`, datos).then((data) => {
          // console.log('inserte ESTATUS', data)
          resolve(datos);
        }, (error) => {
          reject(error);
        })
      }

    });
  }

  selectCatEstatus_Sql() {
    // console.log('select estatus');
    return new Promise((resolve, reject) => {
      this.database.executeSql('SELECT * FROM CatEstatus', []).then((data) => {
        let items = [];
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            items.push({
              id: data.rows.item(i).IdEstatus,
              Estatus: data.rows.item(i).Estatus,
              Estado: data.rows.item(i).Estado
            })
          }
        }
        // console.log('estatus',items)
        resolve(items);

      }, (error) => {
        reject(error);
      })
    });
  
 }

 insertarCatEvento_Sql() {
  // console.log('insert Evento')
  
  this.database.executeSql('DROP TABLE CatTipoEvento');
  this.database.executeSql(CatTipoEvento);
  // console.log('elimine y cree tipoevento')

  this.otService.cargarEventoLista().then((eventos: []) => {
    this.lstEvento = eventos.concat();
  });

  return new Promise((resolve, reject) => {
    var lst = this.lstEvento;
    for (let i = 0; i < lst.length; i++) {
      let datos = [lst[i].Evento, lst[i].EstatusEvento]
      this.database.executeSql(`INSERT INTO CatTipoEvento(Evento,EstatusEvento) VALUES(?,?)`, datos).then((data) => {
        // console.log('inserte ESTATUS', data)
        resolve(datos);
      }, (error) => {
        reject(error);
      })
    }

  });
}

selectCatEvento_Sql() {
  // console.log('select evento');
  return new Promise((resolve, reject) => {
    this.database.executeSql('SELECT * FROM CatTipoEvento', []).then((data) => {
      let items = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          items.push({
            id: data.rows.item(i).IdEvento,
            Evento: data.rows.item(i).Evento,
            EstatusEvento: data.rows.item(i).EstatusEvento
          })
        }
      }
      // console.log('evento',items)
      resolve(items);

    }, (error) => {
      reject(error);
    })
  });

}

insertarCatArea_Sql() {
  // console.log('insert Area')
  
  this.database.executeSql('DROP TABLE CatArea');
  this.database.executeSql(CatArea);
  // console.log('elimine y cree AREA')

  this.otService.cargarAreaLista().then((eventos: []) => {
    this.lstArea = eventos.concat();
  });

  return new Promise((resolve, reject) => {
    var lst = this.lstArea;
    for (let i = 0; i < lst.length; i++) {
      let datos = [lst[i].Area, lst[i].AreaDesc]
      this.database.executeSql(`INSERT INTO CatArea(Area,AreaDesc) VALUES(?,?)`, datos).then((data) => {
        // console.log('inserte Area', data)
        resolve(datos);
      }, (error) => {
        reject(error);
      })
    }

  });
}
  
selectCatArea_Sql() {
  // console.log('select evento');
  return new Promise((resolve, reject) => {
    this.database.executeSql('SELECT * FROM CatArea', []).then((data) => {
      let items = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          items.push({
            Area: data.rows.item(i).Area,
            AreaDesc: data.rows.item(i).AreaDesc
          })
        }
      }
      // console.log('AREA',items)
      resolve(items);

    }, (error) => {
      reject(error);
    })
  });

}


insertarCatGranja_Sql() {
  // console.log('insert Granja')
  
  this.database.executeSql('DROP TABLE CatGranja');
  this.database.executeSql(CatGranja);
  // console.log('elimine y cree Granja')

  this.otService.cargarGranjaLista().then((eventos: []) => {
    this.lstGranja = eventos.concat();
  });

  return new Promise((resolve, reject) => {
    var lst = this.lstGranja;
    for (let i = 0; i < lst.length; i++) {
      let datos = [lst[i].Centro, lst[i].Nombre]
      this.database.executeSql(`INSERT INTO CatGranja(Centro,Nombre) VALUES(?,?)`, datos).then((data) => {
        // console.log('inserte GRANJA', data)
        resolve(datos);
      }, (error) => {
        reject(error);
      })
    }

  });
}

selectCatGranja_Sql() {
  // console.log('select Granja');
  return new Promise((resolve, reject) => {
    this.database.executeSql('SELECT * FROM CatGranja', []).then((data) => {
      let items = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          items.push({
            Centro: data.rows.item(i).Centro,
            Nombre: data.rows.item(i).Nombre
          })
        }
      }
      // console.log('granja',items)
      resolve(items);

    }, (error) => {
      reject(error);
    })
  });

}

insertarCatEquipo_Sql() {
  console.log('insertEquipo')
  
  this.database.executeSql('DROP TABLE CatEquipo');
  this.database.executeSql(CatEquipo);
  console.log('elimine y cree equipo')

  this.otService.cargarEquipoLista().then((eventos: []) => {
    this.lstEquipo = eventos.concat();
  });

  return new Promise((resolve, reject) => {
    var lst = this.lstEquipo;
    for (let i = 0; i < lst.length; i++) {
      let datos = [lst[i].Descripcion, lst[i].Codigo, lst[i].Grupo]
      this.database.executeSql(`INSERT INTO CatEquipo(Descripcion,Codigo,GpoEquipo) VALUES(?,?,?)`, datos).then((data) => {
        console.log('inserte Equipo', data)
        resolve(datos);
      }, (error) => {
        reject(error);
      })
    }

  });
}

selectCatEquipo_Sql() {
  console.log('select Equipo');
  return new Promise((resolve, reject) => {
    this.database.executeSql('SELECT * FROM CatEquipo', []).then((data) => {
      let items = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          items.push({
            Descripcion: data.rows.item(i).Descripcion,
            Codigo: data.rows.item(i).Codigo,
            GpoEquipo: data.rows.item(i).Grupo
          })
        }
      }
      console.log('EQUIPO',items)
      resolve(items);

    }, (error) => {
      reject(error);
    })
  });

}


}





















   


 






//Este aun no

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

  

