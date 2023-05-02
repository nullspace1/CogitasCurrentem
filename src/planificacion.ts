import { Distancia, Tiempo, Entrenamiento } from "./entrenamiento"

class Planificacion {
    mesociclos : MesoCiclo[]
    fechaComienzo : Date

    mesoCicloActual(date : Date) : MesoCiclo {
        return this.mesociclos[-1]
    }

}

class MesoCiclo{
    fechaComienzo : Date
    fechaFinalizacion : Date
    microciclos : MicroCiclo[]

    kilometrosMesociclo() : number {
        return this.microciclos.map(s => s.kilometrosSemanales()).reduce((k1,k2) => k1+k2,0)
    }
}


class MicroCiclo {
    semanaDel : Date
    dias : Entrenamiento[]

    kilometrosSemanales() : number {
        return this.dias.map(e => e.distanciaEnKilometros().enUnidad('Kilometro')).reduce((k1,k2) => k1 + k2,0)
    }
}







export {Planificacion}
