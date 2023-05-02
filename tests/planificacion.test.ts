import { Sexo } from "../src/atleta";
import { Atleta, Tiempo, Entrenamiento, Lap, Resultado, TipoEntrenamiento} from "../src/entrenamiento";
import { Distancia } from "../src/utils";

function lap(metros,segundos){
    return new Lap(new Tiempo(segundos,0,0),new Distancia(metros,'Metro'))
}
const testAtleta = new Atleta('test','test',19,69,169,Sexo.Hombre)

function entrenamiento(laps){
    return new Entrenamiento(testAtleta,'',Resultado.Realizado,laps,TipoEntrenamiento.Aerobico)
}


const paceData = [{lap: lap(1000,60 * 5), exp: new Tiempo(0,5,0)},
                  {lap: lap(400,70), exp: new Tiempo(55,2,0)}]

describe('CalculoPace', () =>
                    test.each(paceData)
                    ('PaceDaCorrecto', (dato) => expect(dato.lap.pace()).toStrictEqual(dato.exp)))

const entrenamientoData = [{ent: entrenamiento([lap(1000,180),lap(1000,190)]), pace: new Tiempo(185,0,0), Tiempo: new Tiempo(190 + 185,0,0), distancia: new Distancia(2,'Kilometro')},
                           {ent: entrenamiento([lap(200,30)]), pace: new Tiempo(150,0,0), Tiempo: new Tiempo(30,0,0), distancia: new Distancia(0.2,'Kilometro')}]

describe('CalculoTiempo', () =>{
                    test.each(entrenamientoData)
                    ('PacePromedioDaCorrecto', (dato) => expect(dato.ent.pacePromedio()).toStrictEqual(dato.pace))
                    test.each(entrenamientoData)
                    ('DuracioDaCorrecto',(dato) => expect(dato.Tiempo).toStrictEqual(dato.Tiempo))})
                    test.each(entrenamientoData)
                    ('DistanciaDaCorrecto', (dato) => expect(dato.ent.distanciaEnKilometros()).toStrictEqual(dato.distancia))
