import {Atleta} from './atleta'
import { Duracion, Distancia, unidadesEnMetro } from './utils'

type EstadoEntrenamiento = "Realizado" | "Ausente"
class Entrenamiento {

    private atleta : Atleta
    private comentario : String
    private fecha : Date[]
    private intervalos : Intervalo[]
    estado : EstadoEntrenamiento

    constructor(intervalos : Intervalo[], comentario : String, estado : EstadoEntrenamiento){
        this.intervalos = intervalos
        this.comentario = comentario
        this.estado = estado
    }

    public kilometrosTotales() : number{
        var distanciaTotal = this.intervalos.map(intervalo => intervalo.distanciaRecorrida.enUnidad('Kilometro')).reduce((x,y) => x + y,0)
        return distanciaTotal
    }

    public paceMaximo () : number{
        return Math.max(...this.intervalos.map(int => int.pace()))
    }

    public pacePromedio() : number{
        var paces = this.intervalos.map(intervalo => intervalo.pace())
        return paces.reduce((x,y) => x + y,0) / paces.length
    }

    public tiempoTotalDeEntrenamiento() : Duracion {
        return this.intervalos.map(intervalo => intervalo.tiempo).reduce((durA : Duracion,durB : Duracion) => durA.sumarA(durB))
    }
}


class Intervalo {
    distanciaRecorrida : Distancia
    tiempo : Duracion
    constructor(tiempo : Duracion, distanciaRecorrida : Distancia){
        this.tiempo = tiempo
        this.distanciaRecorrida = distanciaRecorrida
    }

    public pace(): number {
        return this.tiempo.enMinutos() / this.distanciaRecorrida.enUnidad('Kilometro')
    }
}


export { Entrenamiento,  Distancia, Atleta, Duracion, Intervalo }





