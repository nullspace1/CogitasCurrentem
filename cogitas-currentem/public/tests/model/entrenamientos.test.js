"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnt = void 0;
const entrenamiento_1 = require("../../src/electron/model/entrenamiento");
const lap_1 = require("../../src/electron/model/lap");
const getEnt = (laps, semana, dia) => new entrenamiento_1.Entrenamiento("", entrenamiento_1.Resultado.Normal, laps, entrenamiento_1.TipoEntrenamiento.Aerobico, semana, dia);
exports.getEnt = getEnt;
const Entrenamientos = [
    { ent: (0, exports.getEnt)([new lap_1.Lap(30, 500), new lap_1.Lap(10, 80)], 1, 1), diaAnio: 1, paceMax: 0.06, dist: 580 },
    { ent: (0, exports.getEnt)([new lap_1.Lap(170, 400), new lap_1.Lap(110, 400)], 52, 7), diaAnio: 364, paceMax: 110 / 400, dist: 800 }
];
describe.each(Entrenamientos)('EntrenamientosTest', (data) => {
    it('Max pace matches expected', () => {
        expect(data.ent.getPaceMaximo()).toBe(data.paceMax);
    });
    it('Year day matches expected', () => {
        expect(data.ent.getDiaEnAnio()).toBe(data.diaAnio);
    });
    it('Total distance matches expected', () => {
        expect(data.ent.getDistancia()).toBe(data.dist);
    });
});
//# sourceMappingURL=entrenamientos.test.js.map