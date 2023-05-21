import ElectronStore, { Schema } from "electron-store";
import { Atleta } from "../model/atleta";
import { EntrenamientoSchema } from "./entrenamiento_schema";
import { MesoCicloSchema } from "./planificacion_schema";
import { ipcMain } from "electron";


declare global {
    interface Window {
      electron: {
        getAtletas: () => any[];
        setAtletas: (atletasList : any[]) => void;
      };
}
}

const AtletaSchema : Schema<{atletas: any}>= {
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
                id: {type: 'string'}
            }
        }
    }
}

export class AtletaDB{

    async getAll() : Promise<Atleta[]>{
        const atletas = await window.electron.getAtletas()
        return atletas.map(a => Atleta.fromObject(a))
    }

    async setAtletas(atletas : Atleta[]){
        window.electron.setAtletas(atletas.map(a => a.toObject()))
    }

    async add(atleta : Atleta){
        const atletas = await this.getAll()
        atleta.setId(-1)
        atletas.push(atleta)
        this.setAtletas(atletas)
    }

    async delete(atleta : Atleta) : Promise<Atleta[]>{
        var atletas = await this.getAll()
        console.log(atleta.getId())
        console.log(atletas[0].getId())
        var atletasFilt = atletas.filter(a => a.getId() !== atleta.getId() )
        await this.setAtletas(atletasFilt)
        return  atletasFilt
    }


}

export {AtletaSchema}
