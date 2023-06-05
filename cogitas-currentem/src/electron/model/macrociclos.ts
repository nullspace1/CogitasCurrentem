import { Type } from "class-transformer"
import { Periodo } from "./periodos"
import { Persistable } from "../../frontend/persistence/persistable"

class MacroCiclo extends Persistable{
    private anio : number

    @Type(() => Periodo)
    private periodos : Periodo[]

    private nombre : string

    constructor(anio : number, nombre : string){
        super()
        this.anio = anio
        this.nombre = nombre
        this.periodos = []
    }

    public agregarPeriodo(periodo : Periodo) : void {
        this.periodos.push(periodo)
    }

    public getNombre() : string{
        return this.nombre
    }

    public getAnio() : number{
        return this.anio
    }

    public getPeriodos(){
        return this.periodos
    }

}


export {MacroCiclo}
