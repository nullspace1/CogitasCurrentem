import { Entrenamiento } from "./entrenamiento"

type Sexo = "Hombre" | "Mujer"

class Atleta{

    private alturaEnCm: number
    private apellido : String
    private edad: number
    private entrenamientos : Entrenamiento[]
    private nombre : String
    private pesoEnKilos : number
    private sexo : Sexo

    constructor(nombre : String,apellido : String,edad : number, pesoEnKilos : number, alturaEnCm : number, sexo : Sexo){
        this.nombre = nombre
        this.apellido = apellido
        this.edad = edad
        this.alturaEnCm = alturaEnCm
        this.sexo = sexo
    }

    public ausencias() : Entrenamiento[]{
        return this.entrenamientos.filter(entrenamiento => entrenamiento.estado = "Ausente")
    }

    public entrenamientosRealizados() : Entrenamiento[]{
        return this.entrenamientos.filter(entrenamiento => entrenamiento.estado = "Realizado")
    }
}


export {Atleta}
