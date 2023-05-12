import dayjs from 'dayjs'
import { Tiempo, Distancia, mayorPace, Pace } from './utils'

 enum Resultado {
    Ausente = "Ausente",
    Planificacion = "Planificacion",
    Realizado = "Realizado",
    Normal = "Normal"
}

enum TipoEntrenamiento {
    Aerobico = "Aerobico",
    SubAerobico = "SubAerobico ",
    SuperAerobico = "SuperAerobico",
    VO2MAX = "VO2MAX",
    SUBMAX = "SUBMAX"
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

    toObject(){
        return {
            comentario: this.comentario,
            fecha: JSON.stringify(this.fecha),
            resultado: this.resultado.toString(),
            laps: this.laps.map(x => x.toObject()),
            tipoEntrenamiento: this.tipoEntrenamiento.toString()
        }
    }

    static fromObject(object: { comentario: String; resultado: Resultado; laps: { tiempo: Number; distanciaRecorrida: Number }[]; tipoEntrenamiento: TipoEntrenamiento; fecha: string | number | Date }){
        return new Entrenamiento(object.comentario,object.resultado as Resultado,object.laps.map((l: { tiempo: Number; distanciaRecorrida: Number }) => Lap.fromObject(l)),object.tipoEntrenamiento as TipoEntrenamiento, new Date(object.fecha))
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

    toObject() {
        return {distancia: this.distancia, tiempo: this.tiempo}
    }

    static fromObject(object: { tiempo: Number; distanciaRecorrida: Number }){
        return new Lap(object.tiempo,object.distanciaRecorrida)
    }

}







export { Entrenamiento,   Lap  , Resultado , TipoEntrenamiento}





