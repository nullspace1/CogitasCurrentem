import { Entrenamiento, Resultado, TipoEntrenamiento } from "../../src/electron/model/entrenamiento";
import { Lap } from "../../src/electron/model/lap";


export const getEnt = (laps,semana,dia) => new Entrenamiento("",Resultado.Normal,laps,TipoEntrenamiento.Aerobico,semana,dia)

const Entrenamientos = [
    {ent: getEnt([new Lap(30,500), new Lap(10,80)],1,1), diaAnio : 1, paceMax : 0.06, dist: 580},
    {ent: getEnt([new Lap(170,400), new Lap(110,400)],52,7), diaAnio: 364, paceMax: 110/400, dist: 800}
]

describe.each(Entrenamientos)(
    'EntrenamientosTest',(data) =>
    {
        it('Max pace matches expected',() =>  {
            expect(data.ent.getPaceMaximo()).toBe(data.paceMax)
        });

        it('Year day matches expected', () => {
            expect(data.ent.getDiaEnAnio()).toBe(data.diaAnio)
        });

        it('Total distance matches expected', () => {
            expect(data.ent.getDistancia()).toBe(data.dist)
        })
    }
)
