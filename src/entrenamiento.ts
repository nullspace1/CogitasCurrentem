type Unidad = "Kilometro" | "Metro" | "Milla"
type UnidadesEnMetro = Record<Unidad, number>

const unidadesEnMetro : UnidadesEnMetro = {Kilometro:  1000,
                                           Metro: 1,
                                           Milla: 1609.34}


class Persona {
    nombre : String
    apellido : String
    edad: number

    constructor(nombre : String,apellido : String,edad : number){
        this.nombre = nombre
        this.apellido = apellido
        this.edad = edad
    }
}


class Intervalo {
    duracion : Duracion
    distancia : Distancia
    constructor(duracion : Duracion, distancia : Distancia){
        this.duracion = duracion
        this.distancia = distancia
    }
}


class Duracion {
    segundos : number
    minutos : number
    horas : number

    constructor(segundos : number, minutos: number, horas: number){
        this.segundos = segundos
        this.minutos = minutos
        this.horas = horas
    }

    enMinutos() : number{
        return this.horas * 60 + this.minutos + this.segundos / 60
    }

    sumarA(otraDuracion : Duracion) : Duracion{
        var segsTotales = this.segundos + otraDuracion.segundos
        var minutosTotales = (segsTotales % 60) + this.minutos + otraDuracion.minutos
        var horasTotales = (minutosTotales % 60) + this.horas + otraDuracion.horas
        return new Duracion(segsTotales,minutosTotales,horasTotales)
    }
}

class Distancia {
    cantidad: number
    unidad : Unidad

    constructor(cantidad : number, unidad : Unidad){
        this.cantidad = cantidad;
        this.unidad = unidad;
    }

    metros() : number{
        return unidadesEnMetro[this.unidad] * this.cantidad
    }
}

class Entrenamiento {
    persona : Persona
    fechaEntrenamiento : Date
    intervalos : Intervalo[]

    constructor(persona : Persona, fechaEntrenamiento : Date, intervalos: Intervalo[]){
        this.persona = persona
        this.fechaEntrenamiento = fechaEntrenamiento
        this.intervalos = intervalos
    }

    kilometrosTotales() : number{
        var distanciaTotal = this.intervalos.map(intervalo => intervalo.distancia.metros()).reduce((x,y) => x + y,0)
        return distanciaTotal / unidadesEnMetro.Kilometro
    }

    pacePromedio() : number{
        var distanciaTotal = this.kilometrosTotales()
        var tiempoTotalEnMinutos = this.calcularTiempoTotal().enMinutos()
        return distanciaTotal / tiempoTotalEnMinutos
    }

    calcularTiempoTotal() : Duracion {
        return this.intervalos.map(intervalo => intervalo.duracion).reduce((durA : Duracion,durB : Duracion) => durA.sumarA(durB))
    }
}



export {Persona,Entrenamiento,Intervalo,Duracion,Distancia}




