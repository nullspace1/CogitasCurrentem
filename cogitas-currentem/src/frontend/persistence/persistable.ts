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
