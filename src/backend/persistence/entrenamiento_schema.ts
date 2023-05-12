import { Schema } from "electron-store";
import { Entrenamiento, Resultado, TipoEntrenamiento } from "../model/entrenamiento";
import { LapSchema } from "./lap_schema";

const EntrenamientoSchema: Schema<{entrenamientos: Entrenamiento[]}> = {
    entrenamientos: {
        type:  'array',
        items: {
            type: 'object',
            properties: {
                comentario: {type: 'string'},
                fecha: {type:'string', format: 'date-time'},
                resultado: {type: 'string', enum: Object.values(Resultado)},
                laps: {
                    type: 'array',
                    items: LapSchema.laps.items
                },
                tipoEntrenamiento: {type: 'string',enum: Object.values(TipoEntrenamiento)}
            }
        }
    }
}

export {EntrenamientoSchema}
