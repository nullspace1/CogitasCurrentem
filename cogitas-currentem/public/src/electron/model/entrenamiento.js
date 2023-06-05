"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoEntrenamiento = exports.Resultado = exports.Entrenamiento = void 0;
const lap_1 = require("./lap");
const typeConfigs_1 = require("../typeConfigs");
Object.defineProperty(exports, "Resultado", { enumerable: true, get: function () { return typeConfigs_1.Resultado; } });
Object.defineProperty(exports, "TipoEntrenamiento", { enumerable: true, get: function () { return typeConfigs_1.TipoEntrenamiento; } });
const class_transformer_1 = require("class-transformer");
const persistable_1 = require("../../frontend/persistence/persistable");
class Entrenamiento extends persistable_1.Persistable {
    comentario;
    semana;
    dia;
    laps = [];
    resultado;
    tipoEntrenamiento;
    constructor(comentario, estado, laps, tipoEntrenamiento, semana, dia) {
        super();
        this.comentario = comentario;
        this.resultado = estado;
        this.laps = laps;
        this.tipoEntrenamiento = tipoEntrenamiento;
        this.semana = semana;
        this.dia = dia;
    }
    agregarLap(lap) {
        this.laps.push(lap);
    }
    getDiaEnAnio() {
        return (this.getSemana() - 1) * 7 + this.getDia();
    }
    getPaceMaximo() {
        return this.laps.sort((lap1, lap2) => lap2.getVelocidad() - lap1.getVelocidad())[0].getPace();
    }
    getPacePromedio() {
        return this.laps.map(l => l.getPace()).reduce((x, y) => x + y, 0) / this.laps.length;
    }
    getVelocidadMaxima() {
        return 1 / this.getPaceMaximo();
    }
    getVelocidadPromedio() {
        return 1 / this.getPacePromedio();
    }
    getDistancia() {
        return this.laps.map(l => l.getDistancia()).reduce((x, y) => x + y, 0);
    }
    getResultado() {
        return this.resultado;
    }
    getTipoEntrenamiento() {
        return this.tipoEntrenamiento;
    }
    getComentario() {
        return this.comentario;
    }
    getSemana() {
        return this.semana;
    }
    getDia() {
        return this.dia;
    }
}
__decorate([
    (0, class_transformer_1.Type)(() => lap_1.Lap),
    __metadata("design:type", Array)
], Entrenamiento.prototype, "laps", void 0);
exports.Entrenamiento = Entrenamiento;
//# sourceMappingURL=entrenamiento.js.map