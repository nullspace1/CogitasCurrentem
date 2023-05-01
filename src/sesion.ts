import { Atleta,  Entrenamiento } from "./entrenamiento"


class Sesion {

    private entrenamientos : Entrenamiento[]
    private fechaEntrenamiento : Date
    private lugar : String
    private nombreEntrenamiento : String

    constructor(nombreEntrenamiento : String,fechaEntrenamiento : Date,
       entrenamientos : Entrenamiento[], lugar : String){
       this.nombreEntrenamiento = nombreEntrenamiento
       this.fechaEntrenamiento = fechaEntrenamiento
       this.entrenamientos = entrenamientos
       this.lugar = lugar
    }

}

export {Sesion}
