
import { instanceToPlain, plainToClass } from "class-transformer";
import { Atleta } from "../../electron/model/atleta";
import { Entrenamiento } from "../../electron/model/entrenamiento";
import { Persistable } from "./persistable";

export enum ExistingDatabase {
    'atleta',
    'entrenamientos'
}

const classes  = {
    'atleta': Atleta,
    'entrenamientos' : Entrenamiento
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
        return objects.map(o => plainToClass(classes[this.databaseName],o))
    }

    async setObjects(objects : Persistable[]){
        let objs = objects.map(object => instanceToPlain(object))
        window.electron.setObjectList(objs,this.databaseName)
    }

    async add(object : Persistable){
        const objects = await this.getAll()
        object.setDateOfCreation()
        object.setId()
        objects.push(object)
        this.setObjects(objects)
    }

    async replace(old : Persistable, replacement : Persistable){
        const objects = await this.getAll()
        var filteredObjects = objects.filter(a => a.id !== old.id )
        replacement.id = old.id
        replacement.creationDate = old.creationDate
        filteredObjects.push(replacement)
        await this.setObjects(filteredObjects)
    }

    async delete(object : Persistable) : Promise<Persistable[]>{
        const originalObjects = await this.getAll()
        var filteredObjects = originalObjects.filter(a => a.id !== object.id )
        await this.setObjects(filteredObjects)
        return filteredObjects
    }

    async getById(id : string) : Promise<Persistable>{
        const objects = await this.getAll()
        return objects.filter(o => o.id === id)[0]
    }

}
