import dayjs from 'dayjs'
import { Lap } from './lap'
import { Dia, Distancia, Pace, Resultado, Semana, Tiempo, TipoEntrenamiento, Velocidad, mayorPace } from '../typeConfigs'
import { Result } from 'electron'
import { Type } from 'class-transformer'
import { Persistable } from '../../frontend/persistence/persistable'
import { Atleta } from './atleta'
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { MicroCiclo } from './microciclo'


@Entity()
class Entrenamiento extends Persistable {


    @Column({type:"text"})
    private comentario: string

    @Column({type:"real"})
    private semana: Semana

    @Column({type:"real"})
    private dia: Dia


    @Type(() => Lap)
    @OneToMany(() => Lap,lap => lap.entrenamiento)
    private laps: Lap[] = []

    @Column({type:"simple-enum"})
    private resultado: Resultado

    @Column({type:"simple-enum"})
    private tipoEntrenamiento: TipoEntrenamiento


    @Type(() => Atleta)
    @ManyToOne(() => Atleta)
    public atleta : Atleta

    @Type(() => MicroCiclo)
    @ManyToOne(() =>  MicroCiclo)
    public microciclo : MicroCiclo

    @BeforeInsert()
    init(){
       if (this.laps === undefined) this.laps = []
    }

    constructor(comentario: string, estado: Resultado, laps: Lap[],
        tipoEntrenamiento: TipoEntrenamiento, semana: Semana, dia: Dia, atleta ? : Atleta, microciclo ? :  MicroCiclo) {
        super()
        this.comentario = comentario
        this.resultado = estado
        this.laps = laps
        this.tipoEntrenamiento = tipoEntrenamiento
        this.semana = semana
        this.dia = dia
        this.atleta = atleta
        this.microciclo = microciclo
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





