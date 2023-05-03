import { Sexo } from "../src/model/atleta";
import { Atleta, Tiempo, Entrenamiento, Lap, Resultado, TipoEntrenamiento} from "../src/model/entrenamiento";
import { Distancia } from "../src/model/utils";

function lap(metros : number,segundos : number){
    return new Lap(segundos,metros)
}

function entrenamiento(laps : Lap[]){
    return new Entrenamiento('',Resultado.Realizado,laps,TipoEntrenamiento.Aerobico, new Date('31/2/2023'))
}


const paceData = [{lap: lap(1000,60 * 5), exp: 60 * 5 / 1000},
                  {lap: lap(400,70), exp: 70 / 400}]

describe('CalculoPace', () =>
                    test.each(paceData)
                    ('PaceDaCorrecto', (dato) => expect(dato.lap.pace()).toStrictEqual(dato.exp)))

const entrenamientoData = [{ent: entrenamiento([lap(1000,180),lap(1000,190)]), pace: (190/1000 + 180/1000) /2, Tiempo: (190 + 180), distancia: 2000 , max:180/1000},
                           {ent: entrenamiento([lap(200,30)]), pace: 30/200, Tiempo: 30, distancia: 200, max : 30/200}]

describe('CalculoTiempo', () =>{
                    test.each(entrenamientoData)
                    ('PacePromedioDaCorrecto', (dato) => expect(dato.ent.pacePromedio()).toStrictEqual(dato.pace))
                    test.each(entrenamientoData)
                    ('DuracionDaCorrecto',(dato) => expect(dato.Tiempo).toStrictEqual(dato.Tiempo))})
                    test.each(entrenamientoData)
                    ('DistanciaDaCorrecto', (dato) => expect(dato.ent.distancia()).toStrictEqual(dato.distancia))
                    test.each(entrenamientoData)
                    ('PaceMaximoDaCorrecto', (dato) => expect(dato.ent.paceMaximo()).toBe(dato.max))



