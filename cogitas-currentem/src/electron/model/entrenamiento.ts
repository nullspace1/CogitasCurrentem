import dayjs from 'dayjs'
import { Lap } from './lap'
import { Distancia, Pace, Resultado, Tiempo, TipoEntrenamiento, mayorPace } from '../typeConfigs'



class Entrenamiento{

    private comentario : String
    private fecha : Date
    private laps : Lap[] = []
    private resultado : Resultado
    private tipoEntrenamiento : TipoEntrenamiento

    constructor(comentario : String, estado : Resultado,  laps : Lap[],
                tipoEntrenamiento : TipoEntrenamiento, fecha: Date){
        this.comentario = comentario
        this.resultado = estado
        this.laps = laps
        this.tipoEntrenamiento = tipoEntrenamiento
        this.fecha = fecha
    }

    public agregarLap(lap : Lap){
        this.laps.push(lap)
    }




}











export { Entrenamiento , Resultado , TipoEntrenamiento}





