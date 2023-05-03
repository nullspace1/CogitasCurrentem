import { Tiempo, Entrenamiento, Resultado} from "./entrenamiento"
import { Planificacion } from "./planificacion"
import { Distancia, Pace} from "./utils"


enum Sexo {
    Hombre,
    Mujer
}

class Atleta{

    private alturaEnCm: number
    private fechaNacimiento : Date
    private nombre : String
    private pesoEnKilos : number
    private sexo : Sexo
    private aniosEntrenamiento : number

    private entrenamientosRealizados : Entrenamiento[]
    private planificacion : Planificacion
    private tests : Entrenamiento[]
    private ritmoMaximo : Tiempo

    constructor(nombre : String,fechaNacimiento : Date, pesoEnKilos : number, alturaEnCm : number,
                sexo : Sexo, aniosEntrenamiento : number){
        this.nombre = nombre
        this.fechaNacimiento = fechaNacimiento
        this.alturaEnCm = alturaEnCm
        this.sexo = sexo
        this.tests = []
        this.entrenamientosRealizados = []
        this.aniosEntrenamiento = aniosEntrenamiento
        this.planificacion = new Planificacion()
        this.ritmoMaximo = 0
        this.pesoEnKilos = pesoEnKilos
    }

    public ausencias() : Entrenamiento[]{
        return this.entrenamientosRealizados.filter(entrenamiento => entrenamiento.getResultadoEntrenamiento() == Resultado.Ausente)
    }

    public realizados() : Entrenamiento[]{
        return this.entrenamientosRealizados.filter(entrenamiento => entrenamiento.getResultadoEntrenamiento() == Resultado.Normal)
    }

    public distanciaSemanal(fecha : Date) : Distancia{
        return this.entrenamientosEnSemanaDe(fecha).map((entrenamiento : Entrenamiento) => entrenamiento.distancia()).reduce((x,y) => x + y,0)
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

    public calcularRitmoAl(porcentaje : number) : Pace{
        return  1/(this.ritmoMaximo * porcentaje)
    }

}


export {Atleta, Sexo}
