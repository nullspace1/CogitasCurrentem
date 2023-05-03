import dayjs from 'dayjs'
import {Atleta} from './atleta'
import { Tiempo, Distancia, mayorPace, Pace } from './utils'

enum Resultado {
    Ausente,
    Planificacion,
    Realizado,
    Normal
}

enum TipoEntrenamiento {
    Aerobico,
    SubAerobico,
    SuperAerobico,
    VO2MAX,
    SUBMAX
}

class Entrenamiento {

    private comentario : String
    private fecha : Date
    private resultado : Resultado
    private laps : Lap[] = []
    private tipoEntrenamiento : TipoEntrenamiento

    constructor(comentario : String, estado : Resultado,  laps : Lap[],
                tipoEntrenamiento : TipoEntrenamiento, fecha: Date){
        this.comentario = comentario
        this.resultado = estado
        this.laps = laps
        this.tipoEntrenamiento = tipoEntrenamiento
        this.fecha = fecha
    }

    public distancia () : Distancia {
        return this.laps.map((lap : Lap) => lap.distancia).reduce((x : Distancia,y : Distancia) => x + y,0)
    }

    public paceMaximo () : Tiempo{
        var paces = this.paces()
        var paceMax = paces[0]
        for (var  i =0; i < paces.length ; i++){
            if (mayorPace(paces[i],paceMax) == paces[i]){
                paceMax = paces[i]
            }
        }
        return paceMax
    }

    public pacePromedio() : Pace{
        var paces = this.laps.map((lap : Lap) => lap.pace())
        return paces.reduce((x : Pace,y : Pace) => x + y,0) / paces.length
    }

    public tiempoTotalDeEntrenamiento() : Tiempo {
        return this.laps.map((lap : Lap) => lap.tiempo).reduce((durA : Tiempo,durB : Tiempo) => durA + durB)
    }

    public getResultadoEntrenamiento() : Resultado {
        return this.resultado
    }

    public paces() : Tiempo[]{
        return this.laps.map(lap => lap.pace())
    }

    public enSemanaDe(fecha: Date): boolean {
        return dayjs(this.fecha).isSame(fecha,'week')
    }

}




class Lap {

    distancia : Distancia
    tiempo : Tiempo

    constructor(tiempo : Tiempo, distanciaRecorrida : Distancia){
        this.tiempo = tiempo
        this.distancia = distanciaRecorrida
    }

    public pace(): Pace {
       var tiempo = this.tiempo / this.distancia
       return tiempo
    }

}







export { Entrenamiento,  Distancia, Atleta, Tiempo, Lap  , Resultado , TipoEntrenamiento}





