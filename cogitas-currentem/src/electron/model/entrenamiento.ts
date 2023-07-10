
import { Lap } from './lap'
import { Dia, Distancia, Pace, Resultado, Semana,  TipoEntrenamiento, Velocidad } from '../typeConfigs'
import { Type } from 'class-transformer'
import { Persistable } from '../persistence/persistence'

class Entrenamiento extends Persistable {

    private comentario: string

    private semana: Semana

    private dia: Dia


    @Type(() => Lap)
    private laps: Lap[] = []


    private resultado: Resultado


    private tipoEntrenamiento: TipoEntrenamiento


    constructor(comentario: string, estado: Resultado, laps: Lap[],
        tipoEntrenamiento: TipoEntrenamiento, semana: Semana, dia: Dia) {
        super()
        this.comentario = comentario
        this.resultado = estado
        this.laps = laps
        this.tipoEntrenamiento = tipoEntrenamiento
        this.semana = semana
        this.dia = dia

    }

    public agregarLap(lap: Lap) {
        this.laps.push(lap)
    }

    public getDiaEnAnio(): Dia {
        return (this.getSemana() - 1) * 7 + this.getDia()
    }

    public getPaceMaximo(): Pace {
        return this.laps.sort((lap1, lap2) => lap2.getVelocidad() - lap1.getVelocidad())[0].getPace()
    }

    public getPacePromedio(): Pace {
        return this.laps.map(l => l.getPace()).reduce((x, y) => x + y, 0) / this.laps.length
    }

    public getVelocidadMaxima(): Velocidad {
        return 1 / this.getPaceMaximo()
    }

    public getVelocidadPromedio(): Velocidad {
        return 1 / this.getPacePromedio()
    }

    public getDistancia(): Distancia {
        return this.laps.map(l => l.getDistancia()).reduce((x, y) => x + y, 0)
    }


    public getResultado(): Resultado {
        return this.resultado
    }

    public getTipoEntrenamiento(): TipoEntrenamiento {
        return this.tipoEntrenamiento
    }

    public getComentario(): string {
        return this.comentario
    }

    public getSemana(): Semana {
        return this.semana
    }

    public getDia(): Dia {
        return this.dia
    }


}












export { Entrenamiento, Resultado, TipoEntrenamiento }





