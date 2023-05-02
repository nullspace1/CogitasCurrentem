import {Distancia,Atleta,Tiempo,Entrenamiento} from "../src/entrenamiento";

const TiempoEnMinutosDataSet = [{Tiempo: new Tiempo(10,0,0), minutos: 10/60},
                                  {Tiempo: new Tiempo(0,10,0), minutos: 10},
                                  {Tiempo: new Tiempo(0,0,2), minutos: 120},
                                  {Tiempo: new Tiempo(0,30,1), minutos: 90},
                                {Tiempo: new Tiempo(90,0,0), minutos: 1 + 1/2}]

const sumarTiempoesDataSet = [{TiempoA : new Tiempo(10,0,0), TiempoB : new Tiempo(50,0,0), resultado: new Tiempo(0,1,0)},
                                {TiempoA : new Tiempo(0,10,0), TiempoB : new Tiempo(0,50,0), resultado: new Tiempo(0,0,1)},
                                {TiempoA  : new Tiempo(50,30,0), TiempoB : new Tiempo(0,40,0), resultado: new Tiempo(50,10,1)}]

describe('ClaseTiempo', () => {
        test.each(TiempoEnMinutosDataSet)('Tiempo en minutos es correcta',
         (datos) => expect(datos.Tiempo.enMinutos()).toBe(datos.minutos))
        test.each(sumarTiempoesDataSet)('Sumar Tiempoes da correcto',
        (datos) => expect(datos.TiempoA.sumarA(datos.TiempoB)).toStrictEqual(datos.resultado))
    })


const conversionAMetrosDataSet = [{distancia : new Distancia(10,'Kilometro'), metros: 10000},
                                    {distancia: new Distancia(2000,'Metro'), metros: 2000},
                                {distancia: new Distancia(3,'Milla'), metros: 1609.34 * 3}]
describe('ClaseDistancia', () => {
        test.each(conversionAMetrosDataSet)('Distancia a metros es convertida adecuadamente',
        (datos) => expect(datos.distancia.enUnidad('Metro')).toBe(datos.metros))
})
