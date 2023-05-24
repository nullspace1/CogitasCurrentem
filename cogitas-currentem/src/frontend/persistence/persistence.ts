
import { Atleta } from "../../electron/model/atleta";
import { Entrenamiento } from "../../electron/model/entrenamiento";

export abstract class Persistable {

    id : string
    creationDate : Date


    setDateOfCreation(){
        this.creationDate = new Date()
    }

    setId(){
        this.id = Math.random().toString(16).slice(2)
    }

    asObject(){
        const object = this.toObject()
        object.id = this.id
        object.creationDate = this.creationDate.toDateString()
        return object
    }

    abstract toObject()

}

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
        getObjectList: (string : ExistingDatabase) => Object[];
        setObjectList: (objectList : Object[], storeName : ExistingDatabase) => void;
      };
}
}

export class DatabaseInterface{

    databaseName : ExistingDatabase

    constructor(databaseName : ExistingDatabase){
        this.databaseName = databaseName
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
