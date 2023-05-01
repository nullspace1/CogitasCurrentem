type Unidad = "Kilometro" | "Metro" | "Milla"
type UnidadesEnMetro = Record<Unidad, number>

const unidadesEnMetro : UnidadesEnMetro = {Kilometro:  1000,
                                           Metro: 1,
                                           Milla: 1609.34}



class Duracion {
    private horas : number
    private minutos : number
    private segundos : number

    constructor(segundos : number, minutos: number, horas: number){
        this.segundos = segundos
        this.minutos = minutos
        this.horas = horas
    }

    public enMinutos() : number{
        return this.horas * 60 + this.minutos + this.segundos / 60
    }

    public sumarA(otraDuracion : Duracion) : Duracion{
        var segs = this.segundos + otraDuracion.segundos
        var segsTotales = segs % 60
        var minutosResto = (segs - (segs % 60)) / 60
        var minutos = minutosResto + this.minutos + otraDuracion.minutos
        var minutosTotales = minutos % 60
        var horasResto = (minutos - (minutos % 60)) / 60
        var horasTotales = horasResto + otraDuracion.horas + this.horas
        return new Duracion(segsTotales,minutosTotales,horasTotales)
    }
}

class Distancia {
    private cantidad: number
    private unidad : Unidad

    constructor(cantidad : number, unidad : Unidad){
        this.cantidad = cantidad;
        this.unidad = unidad;
    }

    public enUnidad(unidad : Unidad){
        return unidadesEnMetro[this.unidad] / unidadesEnMetro[unidad] * this.cantidad
    }
}


export {Distancia,Duracion,Unidad,unidadesEnMetro}
