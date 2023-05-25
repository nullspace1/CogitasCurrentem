
import { Atleta } from "../../electron/model/atleta";
import { Entrenamiento } from "../../electron/model/entrenamiento";
import { Persistable } from "./persistable";

export enum ExistingDatabase {
    'atleta',
    'entrenamientos'
}

const converters  = {
    'atleta': (Atleta.fromObject),
    'entrenamientos' : (Entrenamiento.fromObject)
}

declare global {
    interface Window {
      electron: {
        getObjectList: (string : string) => Object[];
        setObjectList: (objectList : Object[], storeName : string) => void;
      };
}
}

export class DatabaseInterface{

    databaseName : string

    constructor(databaseName : ExistingDatabase){
        this.databaseName = ExistingDatabase[databaseName].toString()
    }

    async getAll() : Promise<Persistable[]>{
        const objects = await window.electron.getObjectList(this.databaseName)
        return objects.map(o => converters[this.databaseName](o))
    }

    async setObjects(objects : Persistable[]){
        window.electron.setObjectList(objects.map(object => object.asObject()),this.databaseName)
    }

    async add(object : Persistable){
        const objects = await this.getAll()
        object.setDateOfCreation()
        object.setId()
        objects.push(object)
        this.setObjects(objects)
    }

    async delete(object : Persistable) : Promise<Persistable[]>{
        const originalObjects = await this.getAll()
        var filteredObjects = originalObjects.filter(a => a.id !== object.id )
        await this.setObjects(filteredObjects)
        return filteredObjects
    }

}
