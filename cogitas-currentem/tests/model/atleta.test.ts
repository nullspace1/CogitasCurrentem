
import { DateGenerator } from "../../src/electron/dates";
import { Atleta } from "../../src/electron/model/atleta";
import { Entrenamiento, Resultado, TipoEntrenamiento } from "../../src/electron/model/entrenamiento";
import { Lap } from "../../src/electron/model/lap";
import {Sexo } from "../../src/electron/typeConfigs";




class MockGenerator implements DateGenerator{

    getSemana(): number {
       return 1
    }

    getHoy(): number{
        return Date.now() + 1000 * 60 * 60 * 24 * 370 * 2
    }

}


export function e(list : number[][], week){
    const laps : Lap[] = []
    for (const [a,b] of list){
        laps.push(new Lap(a,b))
    }
    return new Entrenamiento('',Resultado.Normal,laps,TipoEntrenamiento.SUBMAX,week,1)
}

export function getAtleta(fechaNacimiento, aniosEntrenamiento,entrenamiento, carrera,test){
    let z = new Atleta(" ",fechaNacimiento,62, 170, Sexo.Hombre,aniosEntrenamiento,"", new MockGenerator())
    z.agregarEntrenamiento(entrenamiento)
    z.agregarCarrera(carrera)
    z.agregarTest(test)
    z.setDateOfCreation()
    return z
}

const atletas = [
    {atleta: getAtleta(Date.parse("2000/01/01"), 3, e([[1,20]],1),e([[1,10]],3),e([[1,7]],1)),
     ritmoMaximo: 1/20, ritmoAl50: 1/10, distanciaSemanal: 27, aniosEntrenando: 5},
    {atleta: getAtleta(Date.parse("2000/01/01"), 0, e([[9,10]],1),e([[1,3],[1,10]],2),e([[1,7]],3)),
     ritmoMaximo: 1/10, ritmoAl50: 1/5, distanciaSemanal: 10, aniosEntrenando: 2},
     {atleta: getAtleta(Date.parse("2000/01/01"), 5, e([[200,1]],2),e([[3,10]],1),e([[2,10],[7,10]],3)),
     ritmoMaximo: 2/10, ritmoAl50: 4/10, distanciaSemanal: 10, aniosEntrenando: 7}
]

describe.each(atletas)(
    'Testing atleta', (data) => {
        it('Testing getRimoMaximo', () => {
            expect(data.atleta.getRitmoMaximo()).toBe(data.ritmoMaximo)
        });
        it('Testing ritmo al porcentage', () => {
            expect(data.atleta.getRitmoAl(0.5)).toBe(data.ritmoAl50)
        });
        it('Testing distancia semanal', () => {
            expect(data.atleta.getDistanciaSemanal()).toBe(data.distanciaSemanal)
        })
        it('Testing anios entrenando', () => {
            expect(data.atleta.getAniosEntrenamiento()).toBe(data.aniosEntrenando)
        })
    }
)


