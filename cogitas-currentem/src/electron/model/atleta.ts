import { Persistable } from "../../frontend/persistence/persistable"
import { Sexo } from "../typeConfigs"
import { Entrenamiento} from "./entrenamiento"
import { MacroCiclo } from "./macrociclos"




class Atleta extends Persistable{

     private alturaEnCm: number
     private aniosEntrenamiento : number
     private carreras : Entrenamiento[]
     private entrenamientosRealizados : Entrenamiento []
     private fechaNacimiento : Date
     private macroCiclos : MacroCiclo[]
     private nombre : string
     private objetivos: string
     private pesoEnKilos : number
     private sexo : Sexo
     private tests : Entrenamiento[]

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
        this.macroCiclos = []
        this.pesoEnKilos = pesoEnKilos
        this.objetivos = objetivos
    }

    public agregarCarrera(carrera : Entrenamiento){
        this.carreras.push(carrera)
    }

    public agregarMacroCiclo(macroCiclo : MacroCiclo){
        this.macroCiclos.push(macroCiclo)
    }

    public agregarMesociclo(mesociclo : MacroCiclo){
        this.macroCiclos.push(mesociclo)
    }

    public agregarTest(test : Entrenamiento){
        this.tests.push(test)
    }

    private getAniosEntrenando(){
        return new Date(Date.now() - this.creationDate.valueOf()).getFullYear() - 1970
    }

    public agregarEntrenamiento(nuevoEntrenamiento : Entrenamiento){
        this.entrenamientosRealizados.push(nuevoEntrenamiento)
    }

    public getAniosEntrenamiento(){
        return this.aniosEntrenamiento + this.getAniosEntrenando()
    }

    public getEdad(){
        return  new Date(Date.now() - this.fechaNacimiento.valueOf()).getFullYear() - 1970
    }

    toObject() {
        throw new Error("Method not implemented.")
    }


}


export {Atleta, Sexo}
