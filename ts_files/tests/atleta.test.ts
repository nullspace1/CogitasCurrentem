import { Sexo } from "../src/model/atleta";
import { Atleta, Distancia, Entrenamiento, Lap, Resultado, Tiempo, TipoEntrenamiento } from "../src/model/entrenamiento";






function entr(laps : Lap[],atleta : Atleta, resultado: Resultado, tipo: TipoEntrenamiento, fecha: Date){
    return new Entrenamiento('',resultado,laps,tipo, fecha)
}

function lap(metros : Distancia,segundos : Tiempo){
    return new Lap(segundos,metros)
}

const atleta : Atleta = new Atleta('',new Date('2002-08-01'),69,180,Sexo.Hombre,1,)
const laps = [lap(1000,60*2),lap(2000,30*4),lap(200,30)]
const entrenamientos = [entr(laps,atleta,Resultado.Ausente,TipoEntrenamiento.SUBMAX, new Date('2023-4-15')),
                        entr([laps[0]],atleta,Resultado.Normal,TipoEntrenamiento.SubAerobico, new Date('2023-1-15')),
                        entr(laps,atleta,Resultado.Planificacion,TipoEntrenamiento.VO2MAX, new Date('2023-9-20'))]

for (let i = 0; i < entrenamientos.length; i++){
    atleta.registrarEntrenamiento(entrenamientos[i])
}

describe('TestAtleta',
() => {
    test('DeteccionAusencias',() =>  expect(atleta.ausencias()).toStrictEqual([entrenamientos[0]]))
    test('DeteccionRealizados', () => expect(atleta.realizados()).toStrictEqual([entrenamientos[1]]))
    test('KilometrosSemanales', () => expect(atleta.distanciaSemanal(new Date('2023-1-15'))).toBe(1000))
})
