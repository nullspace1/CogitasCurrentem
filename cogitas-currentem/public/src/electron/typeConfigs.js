"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mayorPace = exports.WeightConverter = exports.SpeedConverter = exports.PaceConverter = exports.TimeConverter = exports.DistanceConverter = exports.Dimension = exports.OpcionesPeso = exports.OpcionesVelocidad = exports.OpcionesPace = exports.OpcionesTiempo = exports.OpcionesDistancia = exports.TipoEntrenamiento = exports.Resultado = exports.Sexo = void 0;
var Sexo;
(function (Sexo) {
    Sexo["Hombre"] = "Hombre";
    Sexo["Mujer"] = "Mujer";
})(Sexo = exports.Sexo || (exports.Sexo = {}));
var Resultado;
(function (Resultado) {
    Resultado["Planificado"] = "Planificiado";
    Resultado["Abandono"] = "Abandono";
    Resultado["Normal"] = "Normal";
})(Resultado = exports.Resultado || (exports.Resultado = {}));
var TipoEntrenamiento;
(function (TipoEntrenamiento) {
    TipoEntrenamiento["Aerobico"] = "Aerobico";
    TipoEntrenamiento["SubAerobico"] = "SubAerobico ";
    TipoEntrenamiento["SuperAerobico"] = "SuperAerobico";
    TipoEntrenamiento["VO2MAX"] = "VO2MAX";
    TipoEntrenamiento["SUBMAX"] = "SUBMAX";
})(TipoEntrenamiento = exports.TipoEntrenamiento || (exports.TipoEntrenamiento = {}));
var OpcionesDistancia;
(function (OpcionesDistancia) {
    OpcionesDistancia["Kilometro"] = "Kilometro";
    OpcionesDistancia["Milla"] = "Milla";
    OpcionesDistancia["Metro"] = "Metro";
})(OpcionesDistancia = exports.OpcionesDistancia || (exports.OpcionesDistancia = {}));
var OpcionesTiempo;
(function (OpcionesTiempo) {
    OpcionesTiempo["Minuto"] = "Minuto";
    OpcionesTiempo["Hora"] = "Hora";
    OpcionesTiempo["Segundo"] = "Segundo";
})(OpcionesTiempo = exports.OpcionesTiempo || (exports.OpcionesTiempo = {}));
var OpcionesPace;
(function (OpcionesPace) {
    OpcionesPace["SegundosPorKilometro"] = "SegundosPorKilometro";
    OpcionesPace["MinutosPorKilometro"] = "MinutosPorKilometro";
})(OpcionesPace = exports.OpcionesPace || (exports.OpcionesPace = {}));
var OpcionesVelocidad;
(function (OpcionesVelocidad) {
    OpcionesVelocidad["KilometrosPorMinuto"] = "KilometrosPorMinuto";
    OpcionesVelocidad["MetrosPorSegundo"] = "MetrosPorSegundo";
})(OpcionesVelocidad = exports.OpcionesVelocidad || (exports.OpcionesVelocidad = {}));
var OpcionesPeso;
(function (OpcionesPeso) {
    OpcionesPeso["Libra"] = "Libra";
    OpcionesPeso["Kilogramo"] = "Kilogramo";
})(OpcionesPeso = exports.OpcionesPeso || (exports.OpcionesPeso = {}));
class Dimension {
    values;
    getList() {
        return Array.from(this.values.keys());
    }
    convert(value, to) {
        return (value / this.values.get(to)).toFixed(Math.abs(Math.ceil(Math.log10(this.values.get(to)))) + 2);
    }
    default() {
        return this.getList()[0];
    }
}
exports.Dimension = Dimension;
class DistanceConverter extends Dimension {
    constructor() {
        super();
        this.values = new Map([
            [OpcionesDistancia.Metro, 1],
            [OpcionesDistancia.Kilometro, 1000],
            [OpcionesDistancia.Milla, 1609.34]
        ]);
    }
}
exports.DistanceConverter = DistanceConverter;
class TimeConverter extends Dimension {
    constructor() {
        super();
        this.values = new Map([
            [OpcionesTiempo.Minuto, 60],
            [OpcionesTiempo.Hora, 60 * 60],
            [OpcionesTiempo.Segundo, 1]
        ]);
    }
}
exports.TimeConverter = TimeConverter;
class PaceConverter extends Dimension {
    constructor() {
        super();
        this.values = new Map([
            [OpcionesPace.SegundosPorKilometro, 1 / 1000],
            [OpcionesPace.MinutosPorKilometro, 60 / 1000]
        ]);
    }
}
exports.PaceConverter = PaceConverter;
class SpeedConverter extends Dimension {
    constructor() {
        super();
        this.values = new Map([
            [OpcionesVelocidad.KilometrosPorMinuto, 1000 / 60],
            [OpcionesVelocidad.MetrosPorSegundo, 1]
        ]);
    }
}
exports.SpeedConverter = SpeedConverter;
class WeightConverter extends Dimension {
    constructor() {
        super();
        this.values = new Map([
            [OpcionesPeso.Libra, 0.453592],
            [OpcionesPeso.Kilogramo, 1]
        ]);
    }
}
exports.WeightConverter = WeightConverter;
function mayorPace(x, y) {
    return x < y ? x : y;
}
exports.mayorPace = mayorPace;
//# sourceMappingURL=typeConfigs.js.map