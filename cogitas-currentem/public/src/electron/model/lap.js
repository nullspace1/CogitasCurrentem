"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lap = void 0;
class Lap {
    distancia;
    tiempo;
    constructor(tiempo, distanciaRecorrida) {
        this.tiempo = tiempo;
        this.distancia = distanciaRecorrida;
    }
    getPace() {
        return this.tiempo / this.distancia;
    }
    getVelocidad() {
        return this.distancia / this.tiempo;
    }
    getDistancia() {
        return this.distancia;
    }
    getTiempo() {
        return this.tiempo;
    }
}
exports.Lap = Lap;
//# sourceMappingURL=lap.js.map