import isoWeek from 'dayjs/plugin/isoWeek'
import dayjs from 'dayjs'
import {Atleta} from './atleta'
import { Tiempo, Distancia, unidadesEnMetro } from './utils'

enum Resultado {
    Normal,
    Ausente,
    Planificacion,
    Realizado
}

enum TipoEntrenamiento {
    Aerobico,
    SubAerobico,
    SuperAerobico,
    VO2MAX,
    SUBMAX
}

class  Entrenamiento {

    private atleta : Atleta
    private comentario : String
    private fecha : Date
    private resultado : Resultado
    private laps : Lap[]
    private tipoEntrenamiento : TipoEntrenamiento

    constructor(atleta : Atleta, comentario : String, estado : Resultado,  laps : Lap[], tipoEntrenamiento : TipoEntrenamiento){
        this.atleta = atleta
        this.comentario = comentario
        this.resultado = estado
        this.laps = laps
        this.tipoEntrenamiento = tipoEntrenamiento
    }

    public distanciaEnKilometros() : Distancia {
        var distanciaTotal = this.laps.map(intervalo => intervalo.distancia.enUnidad('Kilometro')).reduce((x,y) => x + y,0)
        return new Distancia(distanciaTotal,'Kilometro')
    }

    public paceMaximo () : Tiempo{
        var paceMax = new Tiempo(100,0,0)
        var paces = this.paces()
        for (var  i =0; i < paces.length ; i++){
            var minutos = paces[i].enMinutos()
            if (minutos < paceMax.enMinutos()){
                paceMax = paces[i]
            }
        }
        return paceMax
    }

    public pacePromedio() : Tiempo{
        var paces = this.laps.map(intervalo => intervalo.pace())
        return paces.reduce((TiempoA,TiempoB) => TiempoA.sumarA(TiempoB),new Tiempo(0,0,0)).dividir(paces.length)
    }

    public tiempoTotalDeEntrenamiento() : Tiempo {
        return this.laps.map(intervalo => intervalo.tiempo).reduce((durA : Tiempo,durB : Tiempo) => durA.sumarA(durB))
    }

    public getResultadoEntrenamiento() : Resultado {
        return this.resultado
    }

    public paces() : Tiempo[]{
        return this.laps.map(intervalo => intervalo.pace())
    }

    public enSemanaDe(fecha: Date): boolean {
        return dayjs(this.fecha).isoWeek == dayjs(fecha).isoWeek
    }

}



class Lap {

    distancia : Distancia
    tiempo : Tiempo

    constructor(tiempo : Tiempo, distanciaRecorrida : Distancia){
        this.tiempo = tiempo
        this.distancia = distanciaRecorrida
    }

    public pace(): Tiempo {
       var tiempo = this.tiempo.enSegundos() / this.distancia.enUnidad('Kilometro')
       return new Tiempo(tiempo,0,0)
    }
}







export { Entrenamiento,  Distancia, Atleta, Tiempo, Lap  , Resultado , TipoEntrenamiento}





