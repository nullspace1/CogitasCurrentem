
import { instanceToPlain, plainToClass } from "class-transformer";
import { Atleta } from "../../electron/model/atleta";
import { Entrenamiento } from "../../electron/model/entrenamiento";
import { Persistable } from "./persistable";
import { Anio } from "../../electron/model/anio";


export enum Tables {
    'atleta',
    'entrenamientos',
    'macrociclo'
}

export const TableClasses  = {
    'atleta': Atleta,
    'entrenamientos' : Entrenamiento,
    'macrociclo' : Anio
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

    constructor(databaseName : Tables){
        this.databaseName = Tables[databaseName].toString()
    }

    async getAll() : Promise<Persistable[]>{
        const objects = await window.electron.getObjectList(this.databaseName)
        const list : Persistable[]=  objects.map(o => plainToClass(TableClasses[this.databaseName],o))
        list.forEach(o => o.init())
        return list
    }

    async setObjects(objects : Persistable[]){
        let objs = objects.map(object => instanceToPlain(object))
        window.electron.setObjectList(objs,this.databaseName)
    }

    async add(object : Persistable){
        const objects = await this.getAll()
        objects.push(object)
        this.setObjects(objects)
    }

    async replace(old : Persistable, replacement : Persistable){
        const objects = await this.getAll()
        var filteredObjects = objects.filter(a => a.id !== old.id )
        replacement.id = old.id
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

    async update(object : Persistable) {
        let list = await this.getAll()
        let newlist = list.filter(o => o.id !== object.id)
        newlist.push(object)
        this.setObjects(newlist)
    }

}
