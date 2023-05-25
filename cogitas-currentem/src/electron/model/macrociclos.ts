import { Periodo } from "./periodos"

class MacroCiclo {
    private anio : number
    private periodos : Periodo[]
    constructor(anio : number){
        this.anio = anio
        this.periodos = []
    }

    public agregarPeriodo(periodo : Periodo) : void {
        this.periodos.push(periodo)
    }

}


export {MacroCiclo}
