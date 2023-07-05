"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAtleta = exports.e = void 0;
const atleta_1 = require("../../src/electron/model/atleta");
const entrenamiento_1 = require("../../src/electron/model/entrenamiento");
const lap_1 = require("../../src/electron/model/lap");
const typeConfigs_1 = require("../../src/electron/typeConfigs");
class MockGenerator {
    getSemana() {
        return 1;
    }
    getHoy() {
        return Date.now() + 1000 * 60 * 60 * 24 * 370 * 2;
    }
}
function e(list, week) {
    const laps = [];
    const entrenamiento = new entrenamiento_1.Entrenamiento('', entrenamiento_1.Resultado.Normal, laps, entrenamiento_1.TipoEntrenamiento.SUBMAX, week, 1);
    for (const [a, b] of list) {
        entrenamiento.agregarLap(new lap_1.Lap(a, b, entrenamiento));
    }
    return new entrenamiento_1.Entrenamiento('', entrenamiento_1.Resultado.Normal, laps, entrenamiento_1.TipoEntrenamiento.SUBMAX, week, 1);
}
exports.e = e;
function getAtleta(fechaNacimiento, aniosEntrenamiento, entrenamiento, carrera, test) {
    let z = new atleta_1.Atleta(" ", fechaNacimiento, 62, 170, typeConfigs_1.Sexo.Hombre, aniosEntrenamiento, "", new MockGenerator());
    z.agregarEntrenamiento(entrenamiento);
    z.agregarCarrera(carrera);
    z.agregarTest(test);
    return z;
}
exports.getAtleta = getAtleta;
const atletas = [
    { atleta: getAtleta(Date.parse("2000/01/01"), 3, e([[1, 20]], 1), e([[1, 10]], 3), e([[1, 7]], 1)),
        ritmoMaximo: 1 / 20, ritmoAl50: 1 / 10, distanciaSemanal: 27, aniosEntrenando: 5 },
    { atleta: getAtleta(Date.parse("2000/01/01"), 0, e([[9, 10]], 1), e([[1, 3], [1, 10]], 2), e([[1, 7]], 3)),
        ritmoMaximo: 1 / 10, ritmoAl50: 1 / 5, distanciaSemanal: 10, aniosEntrenando: 2 },
    { atleta: getAtleta(Date.parse("2000/01/01"), 5, e([[200, 1]], 2), e([[3, 10]], 1), e([[2, 10], [7, 10]], 3)),
        ritmoMaximo: 2 / 10, ritmoAl50: 4 / 10, distanciaSemanal: 10, aniosEntrenando: 7 }
];
describe.each(atletas)('Testing atleta', (data) => {
    it('Testing getRimoMaximo', () => {
        expect(data.atleta.getRitmoMaximo()).toBe(data.ritmoMaximo);
    });
    it('Testing ritmo al porcentage', () => {
        expect(data.atleta.getRitmoAl(0.5)).toBe(data.ritmoAl50);
    });
    it('Testing distancia semanal', () => {
        expect(data.atleta.getDistanciaSemanal()).toBe(data.distanciaSemanal);
    });
    it('Testing anios entrenando', () => {
        expect(data.atleta.getAniosEntrenamiento()).toBe(data.aniosEntrenando);
    });
});
//# sourceMappingURL=atleta.test.js.map