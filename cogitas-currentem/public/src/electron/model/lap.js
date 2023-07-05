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
exports.Lap = void 0;
const typeorm_1 = require("typeorm");
const entrenamiento_1 = require("./entrenamiento");
const class_transformer_1 = require("class-transformer");
const persistable_1 = require("../../frontend/persistence/persistable");
let Lap = class Lap extends persistable_1.Persistable {
    distancia;
    tiempo;
    entrenamiento;
    constructor(tiempo, distanciaRecorrida, entrenamiento) {
        super();
        this.tiempo = tiempo;
        this.distancia = distanciaRecorrida;
        this.entrenamiento = entrenamiento;
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
};
__decorate([
    (0, typeorm_1.Column)({ type: 'real' }),
    __metadata("design:type", Number)
], Lap.prototype, "distancia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'real' }),
    __metadata("design:type", Number)
], Lap.prototype, "tiempo", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => entrenamiento_1.Entrenamiento),
    (0, typeorm_1.ManyToOne)(() => entrenamiento_1.Entrenamiento),
    __metadata("design:type", entrenamiento_1.Entrenamiento)
], Lap.prototype, "entrenamiento", void 0);
Lap = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Number, Number, entrenamiento_1.Entrenamiento])
], Lap);
exports.Lap = Lap;
//# sourceMappingURL=lap.js.map