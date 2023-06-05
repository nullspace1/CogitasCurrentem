import { Type } from "class-transformer"

export abstract class Persistable {

    id : string = ""

    @Type(() => Date)
    creationDate : Date


    setDateOfCreation(){
        this.creationDate = new Date()
    }

    setId(){
        this.id = Math.random().toString(16).slice(2)
    }


}
