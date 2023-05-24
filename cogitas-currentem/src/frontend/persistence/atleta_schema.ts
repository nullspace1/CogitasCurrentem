import ElectronStore, { Schema } from "electron-store";
import { Atleta } from "../../electron/model/atleta";
import { EntrenamientoSchema } from "./entrenamiento_schema";
import { MesoCicloSchema } from "./planificacion_schema";





type AtletaSchema = {atletas : any}

const AtletaSchema : Schema<AtletaSchema>= {
    atletas: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                alturaEnCm:  {type: 'number'},
                fechaNacimiento: {type: "string"},
                nombre: {type: 'string'},
                pesoEnKilos: {type: 'number'},
                sexo: {type: 'string'},
                aniosEntrenamiento: {type: 'number'},
                objetivos: {type: 'string'},
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
                ritmoMaximo: {type: 'number'},
                id: {type: 'string'},
                fechaCreacion: {type: "string"}
            }
        }
    }
}



export {AtletaSchema}
