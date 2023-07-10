"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lap = void 0;
const persistence_1 = require("../persistence/persistence");
class Lap extends persistence_1.Persistable {
    distancia;
    tiempo;
    constructor(tiempo, distanciaRecorrida) {
        super();
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