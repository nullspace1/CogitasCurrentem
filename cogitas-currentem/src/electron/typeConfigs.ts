
export type Tiempo = number;
export type Distancia = number;
export type Pace = number;
export type Velocidad = number;
export type Peso = number;

type OpcionesDistancia = 'Kilometro' | 'Milla' | 'Metro'
type OpcionesTiempo = 'Minuto' | 'Hora' | 'Segundo'
type OpcionesPace = 'SegundosPorKilometro' | 'MinutosPorKilometro'
type OpcionesVelocidad = 'KilometrosPorMinuto' | 'MetrosPorSegundo'
type OpcionesPeso = 'Libra' | 'Kilogramo'

type ConversorDistancia = Record<OpcionesDistancia,Distancia>
const ConversorDistancias : ConversorDistancia = {
    Kilometro : 1000,
    Milla: 1609.34,
    Metro: 1
}

type ConversorTiempo = Record<OpcionesTiempo,Tiempo>
const ConversorTiempos : ConversorTiempo = {
    Minuto : 60,
    Hora: 60 * 60,
    Segundo: 1
}

type ConversorPace = Record<OpcionesPace,Pace>
const ConversorPaces : ConversorPace = {
    SegundosPorKilometro: 60,
    MinutosPorKilometro: 1
}

type ConversorVelocidad = Record<OpcionesVelocidad,Velocidad>
const ConversorVelocidades : ConversorVelocidad = {
    KilometrosPorMinuto : 0.001,
    MetrosPorSegundo : 1
}

type ConversorPeso = Record<OpcionesPeso,Peso>
const ConversorPesos : ConversorPeso = {
    Libra: 0.453592,
    Kilogramo: 1
}

export function mayorPace(x : Pace, y : Pace){
    return x < y ? x : y
}

// god is dead, and this line killed him
export type Semana = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52


export enum Sexo {
    Hombre = "Hombre",
    Mujer ="Mujer"
}

export enum Resultado {
    Ausente = "Ausente",
    Planificacion = "Planificacion",
    Realizado = "Realizado",
    Normal = "Normal"
}

export enum TipoEntrenamiento {
    Aerobico = "Aerobico",
    SubAerobico = "SubAerobico ",
    SuperAerobico = "SuperAerobico",
    VO2MAX = "VO2MAX",
    SUBMAX = "SUBMAX"
}

export {ConversorPesos,ConversorDistancias, ConversorTiempos, ConversorPaces, ConversorVelocidades}







