import { Semana } from "../typeConfigs"
import { MesoCiclo } from "./mesociclos"


export class Periodo {
    private mesoCiclos : MesoCiclo[]
    private semanaComienzo : Semana
    private semanaFin : Semana
    constructor(semanaComienzo : Semana, semanaFin : Semana){
        this.semanaComienzo = semanaComienzo
        this.semanaFin = semanaFin
        this.mesoCiclos = []
    }

    public agregarMesoCiclo(mesoCiclo : MesoCiclo){
        this.mesoCiclos.push(mesoCiclo)
    }

}
