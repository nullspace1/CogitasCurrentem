import {Distancia,Atleta,Duracion,Intervalo,Entrenamiento} from "../src/entrenamiento";

const duracionEnMinutosDataSet = [{duracion: new Duracion(10,0,0), minutos: 10/60},
                                  {duracion: new Duracion(0,10,0), minutos: 10},
                                  {duracion: new Duracion(0,0,2), minutos: 120},
                                  {duracion: new Duracion(0,30,1), minutos: 90},
                                {duracion: new Duracion(90,0,0), minutos: 1 + 1/2}]

const sumarDuracionesDataSet = [{duracionA : new Duracion(10,0,0), duracionB : new Duracion(50,0,0), resultado: new Duracion(0,1,0)},
                                {duracionA : new Duracion(0,10,0), duracionB : new Duracion(0,50,0), resultado: new Duracion(0,0,1)},
                                {duracionA  : new Duracion(50,30,0), duracionB : new Duracion(0,40,0), resultado: new Duracion(50,10,1)}]

describe('ClaseDuracion', () => {
        test.each(duracionEnMinutosDataSet)('Duracion en minutos es correcta',
         (datos) => expect(datos.duracion.enMinutos()).toBe(datos.minutos))
        test.each(sumarDuracionesDataSet)('Sumar duraciones da correcto',
        (datos) => expect(datos.duracionA.sumarA(datos.duracionB)).toStrictEqual(datos.resultado))
    })


const conversionAMetrosDataSet = [{distancia : new Distancia(10,'Kilometro'), metros: 10000},
                                    {distancia: new Distancia(2000,'Metro'), metros: 2000},
                                {distancia: new Distancia(3,'Milla'), metros: 1609.34 * 3}]
describe('ClaseDistancia', () => {
        test.each(conversionAMetrosDataSet)('Distancia a metros es convertida adecuadamente',
        (datos) => expect(datos.distancia.enUnidad('Metro')).toBe(datos.metros))
})
