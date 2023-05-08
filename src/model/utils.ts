const conversionAMetro = {
    metro : 1,
    kilometro : 1000,
    milla: 1609.36
}

const conversionASegundo = {
    minuto : 60,
    hora : 3600
}


type Tiempo = Number
type Distancia = Number
type Pace = Number
type Velocidad = Number


export function mayorPace(x : Pace, y : Pace){
    return x < y ? x : y
}

export {Distancia,Tiempo, Pace,Velocidad}
