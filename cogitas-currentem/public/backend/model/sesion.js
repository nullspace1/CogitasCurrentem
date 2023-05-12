"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sesion = void 0;
class Sesion {
    entrenamientos;
    fechaEntrenamiento;
    lugar;
    nombreEntrenamiento;
    constructor(nombreEntrenamiento, fechaEntrenamiento, entrenamientos, lugar) {
        this.nombreEntrenamiento = nombreEntrenamiento;
        this.fechaEntrenamiento = fechaEntrenamiento;
        this.entrenamientos = entrenamientos;
        this.lugar = lugar;
    }
    registrarEntrenamiento() {
        for (const [atleta, entrenamiento] of this.entrenamientos) {
            atleta.registrarEntrenamiento(entrenamiento);
        }
    }
}
exports.Sesion = Sesion;
//# sourceMappingURL=sesion.js.map