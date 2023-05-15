"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicroCiclo = exports.MesoCiclo = void 0;
const entrenamiento_1 = require("./entrenamiento");
class MesoCiclo {
    fechaComienzo;
    fechaFinalizacion;
    microciclos;
    constructor(fechaComienzo, fechaFin) {
        this.fechaComienzo = fechaComienzo;
        this.fechaFinalizacion = fechaFin;
        this.microciclos = [];
    }
    distanciaTotal() {
        return this.microciclos.map(s => s.distanciaTotal()).reduce((k1, k2) => new Number(k1.valueOf() + k2.valueOf()), 0);
    }
    agregarMicrociclo(microciclo) {
        this.microciclos.push(microciclo);
    }
    existeFechaEntre(fechaA, fechaB) {
        for (let i = 0; i < this.microciclos.length; i++) {
            if ((fechaA <= this.microciclos[i].fechaFinalizacion && fechaA <= this.microciclos[i].fechaComienzo) ||
                (fechaB <= this.microciclos[i].fechaFinalizacion && fechaB <= this.microciclos[i].fechaComienzo))
                return true;
        }
    }
    toObject() {
        return {
            fechaComienzo: JSON.stringify(this.fechaComienzo),
            fechaFinalizacion: JSON.stringify(this.fechaFinalizacion),
            microciclos: this.microciclos.map(m => m.toObject())
        };
    }
    static fromObject(object) {
        var mesociclo = new MesoCiclo(new Date(object.fechaComienzo), new Date(object.fechaFinalizacion));
        object.microciclos.forEach((m) => mesociclo.agregarMicrociclo(MicroCiclo.fromObject(m)));
        return mesociclo;
    }
}
exports.MesoCiclo = MesoCiclo;
class MicroCiclo {
    fechaComienzo;
    fechaFinalizacion;
    dias;
    constructor(fechaComienzo, fechaFin) {
        this.fechaComienzo = fechaComienzo;
        this.fechaFinalizacion = fechaFin;
        this.dias = [];
    }
    distanciaTotal() {
        return this.dias.map(e => e.distancia()).reduce((k1, k2) => new Number(k1.valueOf() + k2.valueOf()), 0);
    }
    agregarEntrenamiento(entrenamiento) {
        this.dias.push(entrenamiento);
    }
    toObject() {
        return {
            fechaComienzo: JSON.stringify(this.fechaComienzo),
            fechaFinalizacion: JSON.stringify(this.fechaFinalizacion),
            dias: this.dias.map(e => e.toObject())
        };
    }
    static fromObject(object) {
        var microciclo = new MicroCiclo(new Date(object.fechaComienzo), new Date(object.fechaFinalizacion));
        object.dias.forEach((e) => microciclo.agregarEntrenamiento(entrenamiento_1.Entrenamiento.fromObject(e)));
        return microciclo;
    }
}
exports.MicroCiclo = MicroCiclo;
//# sourceMappingURL=planificacion.js.map