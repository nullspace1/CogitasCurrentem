import { Schema } from "electron-store";
import { Atleta } from "../model/atleta";
import { EntrenamientoSchema } from "./entrenamiento_schema";
import { MesoCicloSchema } from "./planificacion_schema";

const AtletaSchema : Schema<{atletas: Atleta[]}>= {
    atletas: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                alturaEnCm:  {type: 'number'},
                fechaNacimiento: {type: 'string', format: 'date-time'},
                nombre: {type: 'string'},
                pesoEnKilos: {type: 'number'},
                sexo: {type: 'string'},
                aniosEntrenamiento: {type: 'number'},
                objetivos: {type: 'number'},
                entrenamientosRealizados:{
                        type: 'array',
                        items: EntrenamientoSchema.entrenamientos.items
                    },
                mesoCilos: {type: 'array',
                items: MesoCicloSchema.mesociclos.items},
                tests:  {
                    type: 'array',
                    items: EntrenamientoSchema.entrenamientos.items
                    },
                ritmoMaximo: {type: 'number'}
            }
        }
    }
}

export {AtletaSchema}
