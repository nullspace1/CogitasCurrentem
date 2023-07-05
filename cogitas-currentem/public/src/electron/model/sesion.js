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
exports.Sesion = void 0;
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const persistable_1 = require("../../frontend/persistence/persistable");
let Sesion = class Sesion extends persistable_1.Persistable {
    entrenamientos;
    lugar;
    semana;
    constructor(semana, entrenamientos, lugar) {
        super();
        this.semana = semana;
        this.entrenamientos = entrenamientos;
        this.lugar = lugar;
    }
    registrarEntrenamiento() {
        for (const [atleta, entrenamiento] of this.entrenamientos) {
            atleta.agregarEntrenamiento(entrenamiento);
        }
    }
    getLugar() {
        return this.lugar;
    }
    getSemana() {
        return this.semana;
    }
    getEntrenamientos() {
        return this.entrenamientos;
    }
};
__decorate([
    (0, class_transformer_1.Type)(() => Map),
    __metadata("design:type", Map)
], Sesion.prototype, "entrenamientos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Sesion.prototype, "lugar", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], Sesion.prototype, "semana", void 0);
Sesion = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Number, Map, String])
], Sesion);
exports.Sesion = Sesion;
//# sourceMappingURL=sesion.js.map