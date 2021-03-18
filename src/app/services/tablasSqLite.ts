export const tablasSQLite =
// BEGIN TRANSACTION;
`CREATE TABLE IF NOT EXISTS CatOT(
    IdOT INTEGER PRIMARY KEY NOT NULL,
    Prioridad TEXT,
    CodPrioridad TEXT,
    TipoOT TEXT,
    CodTipoOT TEXT,
    Centro TEXT,
    Granja TEXT,
    Area TEXT,
    CodArea TEXT,
    Ubicacion TEXT,
    Equipo TEXT,
    CodEquipo TEXT,
    Actividad TEXT,
    Materiales TEXT,
    Estatus TEXT,
    CodEstatus TEXT,
    Tecnico TEXT,          
    UUID TEXT
    );`

export const catEquipo =
    `CREATE TABLE IF NOT EXISTS CatEquipo(
    IdEquipo INTEGER PRIMARY KEY NOT NULL,
    Descripcion TEXT,
    Codigo TEXT,
    GpoEquipo TEXT
    );`

    export const elresto = `
   CREATE TABLE IF NOT EXISTS CatEstatus(
    IdEstatus INTEGER PRIMARY KEY NOT NULL,
    Estatus TEXT,
    Estado TEXT
    ); 
   CREATE TABLE IF NOT EXISTS CatPrioridad(
    IdPrioridad INTEGER PRIMARY KEY NOT NULL,
    Nombre TEXT,
    Prioridad TEXT,
    FechaModificacion TEXT
    );
   CREATE TABLE IF NOT EXISTS CatTipo(
    IdTipo INTEGER PRIMARY KEY NOT NULL,
    Tipo TEXT,
    Codigo TEXT
    );
    CREATE TABLE IF NOT EXISTS CatTipoEvento(
     IdEvento INTEGER PRIMARY KEY NOT NULL,
     Evento TEXT,
     EstatusEvento TEXT
    );
   `