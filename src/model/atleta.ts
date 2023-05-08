import {  Entrenamiento, Resultado} from "./entrenamiento"
import { MesoCiclo } from "./planificacion"
import { Distancia, Pace, Tiempo} from "./utils"


enum Sexo {
    Hombre,
    Mujer
}

class Atleta implements ListItem {

    private alturaEnCm: Number
    private fechaNacimiento : Date
    private nombre : String
    private pesoEnKilos : Number
    private sexo : Sexo
    private aniosEntrenamiento : Number
    private objetivos: String
    private entrenamientosRealizados : Entrenamiento[]
    private mesoCiclos : MesoCiclo[]
    private tests : Entrenamiento[]
    private ritmoMaximo : Tiempo

    constructor(nombre : string,fechaNacimiento : Date, pesoEnKilos : Number, alturaEnCm : Number,
                sexo : Sexo, aniosEntrenamiento : Number, objetivos: String){
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


    getItemName(): String {
        return this.nombre
    }

    public ausencias() : Entrenamiento[]{
        return this.entrenamientosRealizados.filter(entrenamiento => entrenamiento.getResultadoEntrenamiento() == Resultado.Ausente)
    }

    public realizados() : Entrenamiento[]{
        return this.entrenamientosRealizados.filter(entrenamiento => entrenamiento.getResultadoEntrenamiento() == Resultado.Normal)
    }

    public distanciaSemanal(fecha : Date) : Distancia{
        return this.entrenamientosEnSemanaDe(fecha).map((entrenamiento : Entrenamiento) => entrenamiento.distancia()).reduce((x,y) => x.valueOf() + y.valueOf(),0)
    }

    private entrenamientosEnSemanaDe(fecha: Date) {
        return this.entrenamientosRealizados.filter(e => e.enSemanaDe(fecha))
    }

    public registrarEntrenamiento(nuevoEntrenamiento : Entrenamiento){
        this.entrenamientosRealizados.push(nuevoEntrenamiento)
    }

    public registrarTest(test : Entrenamiento){
        this.tests.push(test)
        this.ritmoMaximo = test.paceMaximo()
    }

    public calcularRitmoAl(porcentaje : Number) : Pace{
        return  1/(this.ritmoMaximo.valueOf() * porcentaje.valueOf())
    }

    public agregarMesociclo(mesociclo : MesoCiclo){
        this.mesoCiclos.push(mesociclo)
    }

}


export {Atleta, Sexo}
