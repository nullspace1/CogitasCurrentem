import { Schema } from "electron-store"
import { MesoCiclo, MicroCiclo } from "../../electron/model/planificacion"
import { EntrenamientoSchema } from "./entrenamiento_schema"

const MicroCicloSchema : Schema<{microciclos: MicroCiclo[]}>= {
    microciclos: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                fechaComienzo: {type: 'string', format: 'date-time'},
                fechaFinalizacion: {type: 'string', format: 'date-time'},
                dias: {
                    type: 'array',
                    items: EntrenamientoSchema.entrenamientos.items
                }
            }
        }
    }
}

const  MesoCicloSchema : Schema<{mesociclos: MesoCiclo[]}> = {
    mesociclos: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                fechaComienzo: {type: 'string', format: 'date-time'},
                fechaFinalizacion: {type: 'string', format: 'date-time'},
                microciclos: {
                    type: 'array',
                    items: MicroCicloSchema.microciclos.items
                }
            }
        }
    }
}





export {MesoCicloSchema,MicroCicloSchema}
