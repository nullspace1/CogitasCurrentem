const conversionAMetro = {
    metro : 1,
    kilometro : 1000,
    milla: 1609.36
}

const conversionASegundo = {
    minuto : 60,
    hora : 3600
}


type Tiempo = number
type Distancia = number
type Pace = number
type Velocidad = number


export function mayorPace(x : Pace, y : Pace){
    return x < y ? x : y
}

export {Distancia,Tiempo, Pace,Velocidad}
