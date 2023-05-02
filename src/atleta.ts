import { Tiempo, Entrenamiento, Resultado} from "./entrenamiento"
import { Planificacion } from "./planificacion"
import { Distancia, unidadesEnMetro } from "./utils"


enum Sexo {
    Hombre,
    Mujer
}

class Atleta{

    private alturaEnCm: number
    private apellido : String
    private edad: number
    private nombre : String
    private pesoEnKilos : number
    private sexo : Sexo

    private entrenamientosRealizados : Entrenamiento[]
    private planificacion : Planificacion
    private tests : Entrenamiento[]
    private ritmoMaximo : Tiempo

    constructor(nombre : String,apellido : String,edad : number, pesoEnKilos : number, alturaEnCm : number, sexo : Sexo){
        this.nombre = nombre
        this.apellido = apellido
        this.edad = edad
        this.alturaEnCm = alturaEnCm
        this.sexo = sexo
    }

    public ausencias() : Entrenamiento[]{
        return this.entrenamientosRealizados.filter(entrenamiento => entrenamiento.getResultadoEntrenamiento() == Resultado.Ausente)
    }

    public getEntrenamientosRealizados() : Entrenamiento[]{
        return this.entrenamientosRealizados.filter(entrenamiento => entrenamiento.getResultadoEntrenamiento() == Resultado.Realizado)
    }

    public kilometrosSemanales(fecha : Date){
        return new Distancia(this.entrenamientosRealizados.filter(e => e.enSemanaDe(fecha)).map(e => e.distanciaEnKilometros().enUnidad('Kilometro')).reduce((k1,k2) => k1 + k2, 0),'Kilometro')
    }

    public registrarEntrenamiento(nuevoEntrenamiento : Entrenamiento){
        this.entrenamientosRealizados.push(nuevoEntrenamiento)
    }

    public registrarTest(test : Entrenamiento){
        this.tests.push(test)
        this.ritmoMaximo = test.paceMaximo()
    }

    public calcularRitmoAl(porcentaje) : Tiempo{
        var velocidadMaximaEnSegundos = (1/this.ritmoMaximo.enSegundos()) * unidadesEnMetro.Kilometro
        var velocidadPorcentual = velocidadMaximaEnSegundos * porcentaje
        var ritmoEnSegundos = (1/velocidadPorcentual) * (unidadesEnMetro.Kilometro)
        return new Tiempo(ritmoEnSegundos,0,0)
    }

}


export {Atleta, Sexo}
