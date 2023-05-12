import {  Entrenamiento, Resultado} from "./entrenamiento"
import { MesoCiclo } from "./planificacion"
import { Distancia, Pace, Tiempo} from "./utils"


enum Sexo {
    Hombre = "Hombre",
    Mujer ="Mujer"
}

class Atleta{

    private alturaEnCm: Number
    private fechaNacimiento : Date
    private nombre : string
    private pesoEnKilos : Number
    private sexo : Sexo
    private aniosEntrenamiento : Number
    private objetivos: string
    private entrenamientosRealizados : Entrenamiento[]
    private mesoCiclos : MesoCiclo[]
    private tests : Entrenamiento[]
    private ritmoMaximo : Tiempo

    constructor(nombre : string,fechaNacimiento : Date, pesoEnKilos : Number, alturaEnCm : Number,
                sexo : Sexo, aniosEntrenamiento : Number, objetivos: string){
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

    toObject(){
        return {
            alturaEnCm: this.alturaEnCm,
            fechaDeNacimiento: JSON.stringify,
            nombre: this.nombre,
            pesoEnKilos: this.pesoEnKilos,
            sexo: this.sexo.toString(),
            aniosEntrenamiento: this.aniosEntrenamiento,
            objetivos: this.objetivos,
            entrenamientosRealizados: this.entrenamientosRealizados.map(e => e.toObject()),
            mesociclos: this.mesoCiclos.map(m => m.toObject()),
            tests: this.tests.map(t => t.toObject()),
            ritmomaximo: this.ritmoMaximo
        }
    }

    static fromObject(object: { nombre: string; fechaNacimiento: string | number | Date; pesoEnKilos: Number; alturaEnCm: Number; sexo: Sexo; aniosEntrenamiento: Number; objetivos: string; tests: { foreach: (arg0: (t: any) => void) => void }; entrenamientosRealizados: any[]; mesoCiclos: any[] }){
        var atleta = new Atleta(object.nombre,new Date(object.fechaNacimiento),object.pesoEnKilos,object.alturaEnCm,object.sexo as Sexo,object.aniosEntrenamiento, object.objetivos)
        object.tests.foreach((t : any) => atleta.registrarTest(Entrenamiento.fromObject(t)))
        object.entrenamientosRealizados.forEach((e : any) => atleta.registrarEntrenamiento(Entrenamiento.fromObject(e)))
        object.mesoCiclos.forEach((m : any) => atleta.agregarMesociclo(MesoCiclo.fromObject(m)))
    }

}


export {Atleta, Sexo}
