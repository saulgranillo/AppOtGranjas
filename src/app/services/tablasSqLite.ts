export const catOT =
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
    Sala TEXT,
    Equipo TEXT,
    CodEquipo TEXT,
    Actividad TEXT,
    Materiales TEXT,
    Estatus TEXT,
    CodEstatus TEXT,
    Tecnico TEXT,          
    UUID TEXT
    );`
export const CatEquipo =
`CREATE TABLE IF NOT EXISTS CatEquipo(
    IdEquipo INTEGER PRIMARY KEY NOT NULL,
    Descripcion TEXT,
    Codigo TEXT,
    GpoEquipo TEXT
    );`
export const CatEstatus =
`CREATE TABLE IF NOT EXISTS CatEstatus(
    IdEstatus INTEGER PRIMARY KEY NOT NULL,
    Estatus TEXT,
    Estado TEXT
    );`
export const CatPrioridad =
`CREATE TABLE IF NOT EXISTS CatPrioridad(
    IdPrioridad INTEGER PRIMARY KEY NOT NULL,
    Nombre TEXT,
    Prioridad TEXT,
    FechaModificacion TEXT
    );
    `
export const CatTipo = 
`CREATE TABLE IF NOT EXISTS CatTipo(
    IdTipo INTEGER PRIMARY KEY NOT NULL,
    Tipo TEXT,
    Codigo TEXT
    );
    `
export const CatTipoEvento =
`CREATE TABLE IF NOT EXISTS CatTipoEvento(
     IdEvento INTEGER PRIMARY KEY NOT NULL,
     Evento TEXT,
     EstatusEvento TEXT
    );
   `