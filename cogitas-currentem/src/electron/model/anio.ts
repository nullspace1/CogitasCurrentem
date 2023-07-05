import { Type } from "class-transformer"
import { Semana } from "../typeConfigs"
import {  MicroCiclo } from "./microciclo"
import { Persistable } from "../../frontend/persistence/persistable"
import { BeforeInsert, Column, Entity, OneToMany } from "typeorm"

const MICROCICLOS_POR_ANIO = 52

@Entity()
export class Grupo extends Persistable{
    @Column({type:"integer"})
    semanaComienzo: number;

    @Column({type:"integer"})
    semanaFin: number;

    @Column({type:"text"})
    nombre: string;

    @Type(() => MicroCiclo)
    @OneToMany(() => MicroCiclo, microciclo => microciclo.anio)
    microciclos : MicroCiclo[]

    init(){
        if (this.microciclos === undefined) this.microciclos = []
    }


    constructor(semanaComienzo: number, semanaFin: number, nombre: string) {
        super()
        this.semanaComienzo = semanaComienzo;
        this.semanaFin = semanaFin;
        this.nombre = nombre;
    }

    public contiene(semana : number) : boolean{
        return this.semanaComienzo <= semana && semana <= this.semanaFin
    }

    public addMicrociclos(microciclo : MicroCiclo[]){
        this.microciclos = microciclo
    }

    public getDistanciaTotal(){
        return this.microciclos.map(m => m.getDistanciaTotal()).reduce((x,y) => x + y);
    }
}

@Entity()
export class Anio extends Persistable{

    @Type(() => MicroCiclo)
    @OneToMany(() => MicroCiclo, microcilo => microcilo.anio)
    private microciclos : MicroCiclo[]

    @Column({type:"integer"})
    private anio : number

    @Type(() => Grupo)
    private grupos : Grupo[]


    init(){

        if (this.microciclos === undefined) {
        this.microciclos = []
        for (let i = 0; i < MICROCICLOS_POR_ANIO; i++){
            this.microciclos.push(new MicroCiclo(i+1,null,this))
        }
    }
     if (this.grupos === undefined) this.grupos = []
    }

    constructor(anio : number){
        super()
        this.anio = anio
    }

    public agregarMicrociclo(microciclo : MicroCiclo){
        this.microciclos.push(microciclo)
    }

    public getAnio() : number {
        return this.anio
    }

    public getMicrociclos() : MicroCiclo[]{
        return this.microciclos;
    }

    public getGrupos() : Grupo[]{
        return this.grupos
    }

    public asignarGrupoA(grupo : Grupo){
        this.grupos = this.grupos.filter(g => ! (g.contiene(grupo.semanaComienzo) || g.contiene(grupo.semanaFin)))
        grupo.addMicrociclos(this.microciclos.filter(m => grupo.contiene(m.getNumeroSemana())))
        this.grupos.push(grupo)
    }

    public getGrupoFor(semana : number){
        let g = this.grupos.filter(g => g.contiene(semana))[0]
        return g === undefined ? null : g
    }

    public setAnio(anio : number){
        this.anio = anio
    }






}
