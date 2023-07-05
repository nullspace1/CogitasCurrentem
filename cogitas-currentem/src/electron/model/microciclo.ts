import { Type } from "class-transformer"
import { Distancia, Semana } from "../typeConfigs"
import { Entrenamiento } from "./entrenamiento"
import { Persistable } from "../../frontend/persistence/persistable"
import { Anio, Grupo } from "./anio"
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from "typeorm"

@Entity()

export class MicroCiclo extends Persistable{

    @Type(() => Entrenamiento)
    @OneToMany(() => Entrenamiento, entrenamiento => entrenamiento.microciclo, {nullable: true})
    private dias : Entrenamiento[]

    @Column({type:"real"})
    private semana : Semana

    @Type(() => Grupo)
    @ManyToOne(() => Grupo)
    private grupo : Grupo

    @Type(() => Anio)
    @ManyToOne(() => Anio)
    public anio : Anio

    @BeforeInsert()
    init(){
        this.dias = this.dias === undefined ? [] : this.dias
    }

    constructor(numeroSemana : Semana, grupo : Grupo, anio : Anio){
        super()
        this.semana = numeroSemana
        this.grupo = grupo
        this.anio = anio
    }

    public agregarEntrenamiento(entrenamiento : Entrenamiento){
        this.dias.push(entrenamiento)
    }

    public getDistanciaTotal() : Distancia{
        return this.dias.map(d => d.getDistancia()).reduce((x,y) => x + y, 0)
    }

    public getNumeroSemana() : Semana{
        return this.semana
    }

    public getGrupo() : Grupo {
        return this.grupo
    }

    public setGrupo(grupo : Grupo) {
        this.grupo = grupo
    }

}

