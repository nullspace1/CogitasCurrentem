"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoEntrenamiento = exports.Resultado = exports.Lap = exports.Entrenamiento = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utils_1 = require("./utils");
var Resultado;
(function (Resultado) {
    Resultado["Ausente"] = "Ausente";
    Resultado["Planificacion"] = "Planificacion";
    Resultado["Realizado"] = "Realizado";
    Resultado["Normal"] = "Normal";
})(Resultado || (Resultado = {}));
exports.Resultado = Resultado;
var TipoEntrenamiento;
(function (TipoEntrenamiento) {
    TipoEntrenamiento["Aerobico"] = "Aerobico";
    TipoEntrenamiento["SubAerobico"] = "SubAerobico ";
    TipoEntrenamiento["SuperAerobico"] = "SuperAerobico";
    TipoEntrenamiento["VO2MAX"] = "VO2MAX";
    TipoEntrenamiento["SUBMAX"] = "SUBMAX";
})(TipoEntrenamiento || (TipoEntrenamiento = {}));
exports.TipoEntrenamiento = TipoEntrenamiento;
class Entrenamiento {
    comentario;
    fecha;
    resultado;
    laps = [];
    tipoEntrenamiento;
    constructor(comentario, estado, laps, tipoEntrenamiento, fecha) {
        this.comentario = comentario;
        this.resultado = estado;
        this.laps = laps;
        this.tipoEntrenamiento = tipoEntrenamiento;
        this.fecha = fecha;
    }
    distancia() {
        return this.laps.map((lap) => lap.distancia).reduce((x, y) => x.valueOf() + y.valueOf(), 0);
    }
    paceMaximo() {
        var paces = this.paces();
        var paceMax = paces[0];
        for (var i = 0; i < paces.length; i++) {
            if ((0, utils_1.mayorPace)(paces[i], paceMax) == paces[i]) {
                paceMax = paces[i];
            }
        }
        return paceMax;
    }
    pacePromedio() {
        var paces = this.laps.map((lap) => lap.pace());
        return paces.reduce((x, y) => new Number(x.valueOf() + y.valueOf()), new Number(0)).valueOf() / paces.length;
    }
    tiempoTotalDeEntrenamiento() {
        return this.laps.map((lap) => lap.tiempo).reduce((durA, durB) => durA.valueOf() + durB.valueOf());
    }
    getResultadoEntrenamiento() {
        return this.resultado;
    }
    paces() {
        return this.laps.map(lap => lap.pace());
    }
    enSemanaDe(fecha) {
        return (0, dayjs_1.default)(this.fecha).isSame(fecha, 'week');
    }
    toObject() {
        return {
            comentario: this.comentario,
            fecha: JSON.stringify(this.fecha),
            resultado: this.resultado.toString(),
            laps: this.laps.map(x => x.toObject()),
            tipoEntrenamiento: this.tipoEntrenamiento.toString()
        };
    }
    static fromObject(object) {
        return new Entrenamiento(object.comentario, object.resultado, object.laps.map((l) => Lap.fromObject(l)), object.tipoEntrenamiento, new Date(object.fecha));
    }
}
exports.Entrenamiento = Entrenamiento;
class Lap {
    distancia;
    tiempo;
    constructor(tiempo, distanciaRecorrida) {
        this.tiempo = tiempo;
        this.distancia = distanciaRecorrida;
    }
    pace() {
        var tiempo = this.tiempo.valueOf() / this.distancia.valueOf();
        return tiempo;
    }
    toObject() {
        return { distancia: this.distancia, tiempo: this.tiempo };
    }
    static fromObject(object) {
        return new Lap(object.tiempo, object.distanciaRecorrida);
    }
}
exports.Lap = Lap;
//# sourceMappingURL=entrenamiento.js.map