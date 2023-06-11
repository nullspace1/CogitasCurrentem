
export type Tiempo = number;
export type Distancia = number;
export type Pace = number;
export type Velocidad = number;
export type Peso = number;
export type Semana = number
export type Dia = number

export enum Sexo {
  Hombre = "Hombre",
  Mujer = "Mujer"
}

export enum Resultado {
  Planificado = "Planificiado",
  Abandono = "Abandono",
  Normal = "Normal"
}

export enum TipoEntrenamiento {
  Aerobico = "Aerobico",
  SubAerobico = "SubAerobico ",
  SuperAerobico = "SuperAerobico",
  VO2MAX = "VO2MAX",
  SUBMAX = "SUBMAX"
}

export enum OpcionesDistancia {
  Kilometro = 'Kilometro',
  Milla = 'Milla',
  Metro = 'Metro',
}

export enum OpcionesTiempo {
  Minuto = 'Minuto',
  Hora = 'Hora',
  Segundo = 'Segundo',
}

export enum OpcionesPace {
  SegundosPorKilometro = 'SegundosPorKilometro',
  MinutosPorKilometro = 'MinutosPorKilometro',
}

export enum OpcionesVelocidad {
  KilometrosPorMinuto = 'KilometrosPorMinuto',
  MetrosPorSegundo = 'MetrosPorSegundo',
}

export enum OpcionesPeso {
  Libra = 'Libra',
  Kilogramo = 'Kilogramo',
}


export type ValueOption = OpcionesDistancia | OpcionesPace | OpcionesPeso | OpcionesTiempo | OpcionesVelocidad
export abstract class Dimension {

  values: Map<ValueOption, number>

  getList(): ValueOption[] {
    return Array.from(this.values.keys())
  }

  convert(value: number, to: ValueOption) {
    return (value / this.values.get(to)).toFixed(Math.abs(Math.ceil(Math.log10(this.values.get(to)))) + 2)
  }

  default() : ValueOption {
    return this.getList()[0]
  }

}

export class DistanceConverter extends Dimension {

  constructor() {
    super()
    this.values = new Map<ValueOption,number>([
      [OpcionesDistancia.Metro, 1],
      [OpcionesDistancia.Kilometro, 1000],
      [OpcionesDistancia.Milla, 1609.34]
    ])
  }

}

export class TimeConverter extends Dimension {

  constructor() {
    super()
    this.values = new Map<ValueOption,number>([
      [OpcionesTiempo.Minuto, 60],
      [OpcionesTiempo.Hora, 60 * 60],
      [OpcionesTiempo.Segundo, 1]
    ])
  }

}

export class PaceConverter extends Dimension {
  constructor() {
    super()
    this.values = new Map<OpcionesPace, Pace>([
      [OpcionesPace.SegundosPorKilometro, 1 / 1000],
      [OpcionesPace.MinutosPorKilometro, 60 / 1000]
    ])
  }
}

export class SpeedConverter extends Dimension {
  constructor() {
    super()
    this.values = new Map<OpcionesVelocidad, Velocidad>([
      [OpcionesVelocidad.KilometrosPorMinuto, 1000 / 60],
      [OpcionesVelocidad.MetrosPorSegundo, 1]
    ])
  }
}

export class WeightConverter extends Dimension {
  constructor() {
    super()
    this.values = new Map<OpcionesPeso, Peso>([
      [OpcionesPeso.Libra, 0.453592],
      [OpcionesPeso.Kilogramo, 1]
    ])
  }
}

export function mayorPace(x: Pace, y: Pace) {
  return x < y ? x : y
}









