// userStore.ts
import {Entrenamiento, Lap} from '../model/entrenamiento'
import { MesoCiclo, MicroCiclo } from '../model/planificacion';
import { Atleta, Sexo } from '../model/atleta';
import { MesoCicloSchema, MicroCicloSchema } from './planificacion_schema';
import { AtletaSchema } from './atleta_schema';
import { EntrenamientoSchema } from './entrenamiento_schema';
import { LapSchema } from './lap_schema';

export type AppSchemas = {
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

export  const schemas = {
    ...AtletaSchema,
    ...MesoCicloSchema,
    ...MicroCicloSchema,
    ...EntrenamientoSchema,
    ...LapSchema
}


