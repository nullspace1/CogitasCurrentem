import dayjs, { Dayjs } from "dayjs"
import { Distancia, Tiempo, Entrenamiento } from "./entrenamiento"



class Planificacion {
    mesociclos : MesoCiclo[]

    constructor(){
        this.mesociclos = []
    }

    mesoCicloActual(date : Date) : MesoCiclo | undefined {
        return (this.mesociclos.length > 0) ? this.mesociclos[-1] : undefined
    }

    agregarMesociclo(mesociclo : MesoCiclo){
        this.mesociclos.push(mesociclo)
    }

    existeFechaEntre(fechaA : Date, fechaB : Date){
        for (let i = 0; i < this.mesociclos.length; i ++){
            if ((fechaA <= this.mesociclos[i].fechaFinalizacion && fechaA <= this.mesociclos[i].fechaComienzo) ||
                (fechaB <= this.mesociclos[i].fechaFinalizacion && fechaB <= this.mesociclos[i].fechaComienzo))
                return true
        }
    }

}

class MesoCiclo{
    fechaComienzo : Date
    fechaFinalizacion : Date
    microciclos : MicroCiclo[]

    constructor(fechaComienzo : Date,fechaFin : Date){
        this.fechaComienzo = fechaComienzo
        this.fechaFinalizacion = fechaFin
        this.microciclos = []
    }

    distanciaTotal() : number {
        return this.microciclos.map(s => s.distanciaTotal()).reduce((k1,k2) => k1+k2,0)
    }

    agregarMicrociclo(microciclo : MicroCiclo){
        this.microciclos.push(microciclo)
    }

    existeFechaEntre(fechaA : Date, fechaB : Date){
        for (let i = 0; i < this.microciclos.length; i ++){
            if ((fechaA <= this.microciclos[i].fechaFinalizacion && fechaA <= this.microciclos[i].fechaComienzo) ||
                (fechaB <= this.microciclos[i].fechaFinalizacion && fechaB <= this.microciclos[i].fechaComienzo))
                return true
        }
    }

}

class MicroCiclo {
    fechaComienzo : Date
    fechaFinalizacion : Date
    dias : Entrenamiento[]

    constructor(fechaComienzo : Date,fechaFin : Date){
        this.fechaComienzo = fechaComienzo
        this.fechaFinalizacion = fechaFin
        this.dias = []
    }

    distanciaTotal() : number {
        return this.dias.map(e => e.distancia()).reduce((k1,k2) => k1 + k2,0)
    }

    agregarEntrenamiento(entrenamiento : Entrenamiento){
        this.dias.push(entrenamiento)
    }


}







export {Planificacion}
