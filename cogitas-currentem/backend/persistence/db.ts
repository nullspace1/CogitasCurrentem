// userStore.ts
import {Entrenamiento, Lap} from '../model/entrenamiento'
import { MesoCiclo, MicroCiclo } from '../model/planificacion';
import { Atleta } from '../model/atleta';
import { MesoCicloSchema, MicroCicloSchema } from './planificacion_schema';
import { AtletaSchema } from './atleta_schema';
import { EntrenamientoSchema } from './entrenamiento_schema';
import { LapSchema } from './lap_schema';
import { ipcMain } from 'electron';
import ElectronStore = require('electron-store');

type AppSchemas = {
    laps: Lap[],
    atletas: Atleta[],
    mesociclos: MesoCiclo[],
    microciclos: MicroCiclo[],
    entrenamientos: Entrenamiento[]
}

export const enum SchemaNames {
    "atletas",
    "entrenamientos",
    "laps",
    "mesociclos",
    "microciclos",
}

type Persistable = Atleta | Entrenamiento | MesoCiclo | MicroCiclo | Lap

const schemas = {
    ...AtletaSchema,
    ...MesoCicloSchema,
    ...MicroCicloSchema,
    ...EntrenamientoSchema,
    ...LapSchema
}

const store = new ElectronStore<AppSchemas>({
    schema: schemas,
});

export function persist(schemaname: SchemaNames, object: Persistable){
    const currentObjects : Persistable[] = store.get(schemaname.toString(),[])
    currentObjects.push(object)
    store.set(schemaname.toString(),currentObjects)
}

export function getAll(schemaname: SchemaNames) : Persistable[]{
    return store.get(schemaname.toString(),[])
}

export function setPersistence(){
    ipcMain.on('fetch-atletas', (event) => {
        const items = getAll(SchemaNames.atletas); // Assuming getItems() function returns the list of items from the store
        event.sender.send('items-fetched', items);
    })
}
