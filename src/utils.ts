type Unidad = "Kilometro" | "Metro" | "Milla"
type UnidadesEnMetro = Record<Unidad, number>
const unidadesEnMetro : UnidadesEnMetro = {Kilometro:  1000,
                                           Metro: 1,
                                           Milla: 1609.34}

class Tiempo {

    horas : number
    minutos : number
    segundos : number

    constructor(segundos : number, minutos: number, horas: number){
        this.segundos = segundos % 60
        var minsTotales = ((segundos - (segundos % 60)) / 60 + minutos)
        this.minutos = minsTotales % 60
        this.horas = (minsTotales - (minsTotales % 60)) / 60 + horas
    }

    public enMinutos() : number{
        return this.horas * 60 + this.minutos + this.segundos / 60
    }

    public enSegundos() : number {
        return this.horas * 60 * 60 + this.minutos * 60 + this.segundos
    }

    public sumarA(otraTiempo : Tiempo) : Tiempo{
        return new Tiempo(this.segundos + otraTiempo.segundos, this.minutos + otraTiempo.minutos, this.horas + otraTiempo.horas)
    }

    public dividir(valor : number) : Tiempo{
        return new Tiempo(this.enSegundos()/valor,0,0)
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




export {Distancia,Tiempo,Unidad,unidadesEnMetro}
