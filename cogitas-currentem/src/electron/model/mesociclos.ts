import { Semana } from "../typeConfigs"
import { MicroCiclo } from "./microciclos"


export class MesoCiclo{
    private microciclos : MicroCiclo[]
    private semanaComienzo : Semana
    private semanaFin : Semana

    constructor(semanaComienzo : Semana, semanaFin: Semana){
        this.semanaComienzo = semanaComienzo
        this.semanaFin = semanaFin
        this.microciclos = []
    }

    public agregarMicrociclo(microciclo : MicroCiclo){
        this.microciclos.push(microciclo)
    }

}
