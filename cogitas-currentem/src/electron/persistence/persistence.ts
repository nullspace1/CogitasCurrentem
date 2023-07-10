import { Knex } from "knex";

type ID = number

abstract class Persistable {
   public id : number
}

abstract class Repository<T extends Persistable> {

    protected knex : Knex;
    protected TABLE_NAME : string;

    constructor(knex : Knex){
        this.knex = knex
    }

    public async save(object : T) : Promise<T>{
        if (object.id === undefined) {
            const ids = await this.knex(this.TABLE_NAME).insert(this.toData(object))
            object.id = ids[0]
            return object
        } else {
            await this.knex(this.TABLE_NAME).update(this.toData(object)).where('id','=',object.id)
            return object
        }
    }

    public async get(id : ID) : Promise<T>{
        const data = await this.knex(this.TABLE_NAME).select("*").where('id', "=", id)
        return this.toObject(data[0]);
    }

    public async  getAll() : Promise<T[]>{
        let atletaList = await this.knex(this.TABLE_NAME).select("*")
        return atletaList.map(a => this.toObject(a))
    }

    public async delete(object : T): Promise<void>{
        await this.knex(this.TABLE_NAME).delete().where('id','=',object.id)
    }


    protected toIdList(list : T[]){
        return list.map(e => e.id)
    }

    protected abstract toObject(data: any)
    protected abstract toData(object : T)

}

export {Repository,ID,Persistable}
