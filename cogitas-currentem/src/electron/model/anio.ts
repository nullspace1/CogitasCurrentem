import { Type } from "class-transformer"
import { Semana } from "../typeConfigs"
import {  MicroCiclo } from "./microciclo"
import { Persistable } from "../persistence/persistence"


const MICROCICLOS_POR_ANIO = 52



export class Anio extends Persistable{

    @Type(() => MicroCiclo)
    private microciclos : MicroCiclo[]

    private anio : number

    @Type(() => Grupo)
    private grupos : Grupo[]


    constructor(anio : number){
        super()
        this.anio = anio
        this.microciclos = []
        for(let i = 0; i<MICROCICLOS_POR_ANIO;i++){
            this.microciclos.push(new MicroCiclo(i))
        }
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




export class Grupo extends Persistable{

    semanaComienzo: number;


    semanaFin: number;


    nombre: string;

    @Type(() => MicroCiclo)
    microciclos : MicroCiclo[]



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
