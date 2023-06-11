import { Type } from "class-transformer"
import { Semana } from "../typeConfigs"
import { MesoCiclo } from "./mesociclos"
import { Persistable } from "../../frontend/persistence/persistable"


export class Periodo extends Persistable{
    @Type(() => MesoCiclo)
    private mesoCiclos : MesoCiclo[]
    private semanaComienzo : Semana
    private semanaFin : Semana
    private nombre : string

    constructor(semanaComienzo : Semana, semanaFin : Semana, nombre : string){
        super()
        this.semanaComienzo = semanaComienzo
        this.semanaFin = semanaFin
        this.nombre = nombre
        this.mesoCiclos = []
    }

    public agregarMesoCiclo(mesoCiclo : MesoCiclo){
        this.mesoCiclos.push(mesoCiclo)
    }

    public getNombre() : string{
        return this.nombre
    }

    public getSemanaComienzo() : Semana{
        return this.semanaComienzo
    }

    public getSemanaFin() : Semana{
        return this.semanaFin
    }

}
