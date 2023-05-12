import {Entrenamiento } from "./entrenamiento"


export class MesoCiclo{
    fechaComienzo : Date
    fechaFinalizacion : Date
    microciclos : MicroCiclo[]

    constructor(fechaComienzo : Date,fechaFin : Date){
        this.fechaComienzo = fechaComienzo
        this.fechaFinalizacion = fechaFin
        this.microciclos = []
    }


    distanciaTotal() : Number {
        return this.microciclos.map(s => s.distanciaTotal()).reduce((k1 : Number,k2 : Number) => new Number(k1.valueOf()+k2.valueOf()),0)
    }

    agregarMicrociclo(microciclo : MicroCiclo){
        this.microciclos.push(microciclo)
    }

    existeFechaEntre(fechaA : Date, fechaB : Date){
        for (let i = 0; i < this.microciclos.length; i ++){
            if ((fechaA <= this.microciclos[i].fechaFinalizacion && fechaA <= this.microciclos[i].fechaComienzo) ||
                (fechaB <= this.microciclos[i].fechaFinalizacion && fechaB <= this.microciclos[i].fechaComienzo))
                return true
        }
    }

    toObject(){
        return {
            fechaComienzo: JSON.stringify(this.fechaComienzo),
            fechaFinalizacion: JSON.stringify(this.fechaFinalizacion),
            microciclos: this.microciclos.map(m => m.toObject())
        }
    }

    static fromObject(object: { fechaComienzo: string | number | Date; fechaFinalizacion: string | number | Date; microciclos: any[] }){
        var mesociclo =  new MesoCiclo(new Date(object.fechaComienzo),new Date(object.fechaFinalizacion))
        object.microciclos.forEach((m : any) => mesociclo.agregarMicrociclo(MicroCiclo.fromObject(m)))
        return mesociclo
    }

}

export class MicroCiclo{
    fechaComienzo : Date
    fechaFinalizacion : Date
    dias : Entrenamiento[]

    constructor(fechaComienzo : Date,fechaFin : Date){
        this.fechaComienzo = fechaComienzo
        this.fechaFinalizacion = fechaFin
        this.dias = []
    }

    distanciaTotal() : Number {
        return this.dias.map(e => e.distancia()).reduce((k1,k2) => new Number(k1.valueOf() + k2.valueOf()),0)
    }

    agregarEntrenamiento(entrenamiento : Entrenamiento){
        this.dias.push(entrenamiento)
    }

    toObject(){
        return {
            fechaComienzo : JSON.stringify(this.fechaComienzo),
            fechaFinalizacion: JSON.stringify(this.fechaFinalizacion),
            dias: this.dias.map(e => e.toObject())
        }
    }

    static fromObject(object: { fechaComienzo: Date; fechaFinalizacion: Date; dias: any[] }){
       var microciclo = new MicroCiclo(new Date(object.fechaComienzo),new Date(object.fechaFinalizacion))
        object.dias.forEach((e : any)=> microciclo.agregarEntrenamiento(Entrenamiento.fromObject(e)))
        return microciclo
    }

}




