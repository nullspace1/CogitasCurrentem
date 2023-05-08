import dayjs from 'dayjs'
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

class Entrenamiento{

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
        return this.laps.map((lap : Lap) => lap.distancia).reduce((x : Distancia,y : Distancia) => x.valueOf() + y.valueOf(),0)
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
        return paces.reduce((x : Number,y : Number) => new Number(x.valueOf() + y.valueOf()),new Number(0)).valueOf() / paces.length
    }

    public tiempoTotalDeEntrenamiento() : Tiempo {
        return this.laps.map((lap : Lap) => lap.tiempo).reduce((durA : Tiempo,durB : Tiempo) => durA.valueOf() + durB.valueOf())
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
       var tiempo = this.tiempo.valueOf() / this.distancia.valueOf()
       return tiempo
    }

}







export { Entrenamiento,   Lap  , Resultado , TipoEntrenamiento}





