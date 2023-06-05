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
exports.MicroCiclo = void 0;
const class_transformer_1 = require("class-transformer");
const entrenamiento_1 = require("./entrenamiento");
const persistable_1 = require("../../frontend/persistence/persistable");
class MicroCiclo extends persistable_1.Persistable {
    dias;
    numeroSemana;
    constructor(numeroSemana) {
        super();
        this.numeroSemana = numeroSemana;
        this.dias = [];
    }
    agregarEntrenamiento(entrenamiento) {
        this.dias.push(entrenamiento);
    }
    getDistanciaTotal() {
        return this.dias.map(d => d.getDistancia()).reduce((x, y) => x + y, 0);
    }
}
__decorate([
    (0, class_transformer_1.Type)(() => entrenamiento_1.Entrenamiento),
    __metadata("design:type", Array)
], MicroCiclo.prototype, "dias", void 0);
exports.MicroCiclo = MicroCiclo;
//# sourceMappingURL=microciclos.js.map