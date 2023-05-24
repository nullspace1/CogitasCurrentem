import { Persistable } from "../../frontend/persistence/persistence"
import {  Entrenamiento, Resultado} from "./entrenamiento"
import { MesoCiclo } from "./planificacion"
import { Distancia, Pace, Tiempo} from "./utils"


enum Sexo {
    Hombre = "Hombre",
    Mujer ="Mujer"
}

class Atleta extends Persistable{

     alturaEnCm: number
     fechaNacimiento : Date
     nombre : string
     pesoEnKilos : number
     sexo : Sexo
     aniosEntrenamiento : number
     objetivos: string
     entrenamientosRealizados : Entrenamiento[]
     mesoCiclos : MesoCiclo[]
     tests : Entrenamiento[]
     ritmoMaximo : Tiempo
     fechaCreacion : Date

    constructor(nombre : string,fechaNacimiento : Date, pesoEnKilos : number, alturaEnCm : number,
                sexo : Sexo, aniosEntrenamiento : number, objetivos: string){
        super()
        this.nombre = nombre
        this.fechaNacimiento = fechaNacimiento
        this.alturaEnCm = alturaEnCm
        this.sexo = sexo
        this.tests = []
        this.entrenamientosRealizados = []
        this.aniosEntrenamiento = aniosEntrenamiento
        this.mesoCiclos = []
        this.ritmoMaximo = -1
        this.pesoEnKilos = pesoEnKilos
        this.objetivos = objetivos
    }

    ausencias() : Entrenamiento[]{
        return this.entrenamientosRealizados.filter(entrenamiento => entrenamiento.getResultadoEntrenamiento() === Resultado.Ausente)
    }

    realizados() : Entrenamiento[]{
        return this.entrenamientosRealizados.filter(entrenamiento => entrenamiento.getResultadoEntrenamiento() === Resultado.Normal)
    }

    distanciaSemanal(fecha : Date) : Distancia{
        return this.entrenamientosEnSemanaDe(fecha).map((entrenamiento : Entrenamiento) => entrenamiento.distancia()).reduce((x,y) => x.valueOf() + y.valueOf(),0)
    }

    entrenamientosEnSemanaDe(fecha: Date) {
        return this.entrenamientosRealizados.filter(e => e.enSemanaDe(fecha))
    }

    registrarEntrenamiento(nuevoEntrenamiento : Entrenamiento){
        this.entrenamientosRealizados.push(nuevoEntrenamiento)
    }

    registrarTest(test : Entrenamiento){
        this.tests.push(test)
        this.ritmoMaximo = test.paceMaximo()
    }

    calcularRitmoAl(porcentaje : Number) : Pace{
        return  1/(this.ritmoMaximo.valueOf() * porcentaje.valueOf())
    }

    agregarMesociclo(mesociclo : MesoCiclo){
        this.mesoCiclos.push(mesociclo)
    }

    getAniosEntrenamiento(){
        return this.aniosEntrenamiento + this.getAniosEntrenando()
    }

    getAniosEntrenando(){
        return new Date(Date.now() - this.fechaCreacion.valueOf()).getFullYear() - 1970
    }

    getEdad(){
        return  new Date(Date.now() - this.fechaNacimiento.valueOf()).getFullYear() - 1970
    }

    setFechaCreacion(fecha : Date){
        this.fechaCreacion = fecha.valueOf() === 0 ? new Date() : fecha
    }

    agregarEntrenamiento(entrenamiento: Entrenamiento) {
        this.entrenamientosRealizados.push(entrenamiento)
    }

    toObject(){
        return {
            alturaEnCm: this.alturaEnCm,
            fechaNacimiento: this.fechaNacimiento.toDateString(),
            nombre: this.nombre,
            pesoEnKilos: this.pesoEnKilos,
            sexo: this.sexo.toString(),
            aniosEntrenamiento: this.aniosEntrenamiento,
            objetivos: this.objetivos,
            entrenamientosRealizados: this.entrenamientosRealizados.map(e => e.toObject()),
            mesoCiclos: this.mesoCiclos.map(m => m.toObject()),
            tests: this.tests.map(t => t.toObject()),
            ritmomaximo: this.ritmoMaximo,
            fechaCreacion: this.fechaCreacion.toDateString()
        }
    }

    static fromObject(object: { nombre: string; fechaNacimiento: string; pesoEnKilos: number; alturaEnCm: number; sexo: Sexo; aniosEntrenamiento: number; objetivos: string; tests: any[]; entrenamientosRealizados: any[]; mesoCiclos: any[] , id: string, fechaCreacion: string}){
        var atleta = new Atleta(object.nombre,new Date(object.fechaNacimiento),object.pesoEnKilos,object.alturaEnCm,object.sexo as Sexo,object.aniosEntrenamiento, object.objetivos)
        object.tests.forEach((t : any) => atleta.registrarTest(Entrenamiento.fromObject(t)))
        object.entrenamientosRealizados.forEach((e : any) => atleta.registrarEntrenamiento(Entrenamiento.fromObject(e)))
        object.mesoCiclos.forEach((m : any) => atleta.agregarMesociclo(MesoCiclo.fromObject(m)))
        atleta.setFechaCreacion(new Date(object.fechaCreacion))
        return atleta
    }

}


export {Atleta, Sexo}
