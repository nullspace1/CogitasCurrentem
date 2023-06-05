import { Type } from "class-transformer"
import { Semana } from "../typeConfigs"
import { MicroCiclo } from "./microciclos"
import { Persistable } from "../../frontend/persistence/persistable"


export class MesoCiclo extends Persistable{

    @Type(() => MicroCiclo)
    private microciclos : MicroCiclo[]
    private semanaComienzo : Semana
    private semanaFin : Semana
    private nombre : string

    constructor(semanaComienzo : Semana, semanaFin: Semana, nombre : string){
        super()
        this.semanaComienzo = semanaComienzo
        this.semanaFin = semanaFin
        this.nombre = nombre
        this.microciclos = []
    }

    public agregarMicrociclo(microciclo : MicroCiclo){
        this.microciclos.push(microciclo)
    }

    public getDistanciaTotal(){
        this.microciclos.map(m => m.getDistanciaTotal()).reduce((x,y) => x+y,0)
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
