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
const anio_1 = require("./anio");
const typeorm_1 = require("typeorm");
let MicroCiclo = class MicroCiclo extends persistable_1.Persistable {
    dias;
    semana;
    grupo;
    anio;
    init() {
        this.dias = this.dias === undefined ? [] : this.dias;
    }
    constructor(numeroSemana, grupo, anio) {
        super();
        this.semana = numeroSemana;
        this.grupo = grupo;
        this.anio = anio;
    }
    agregarEntrenamiento(entrenamiento) {
        this.dias.push(entrenamiento);
    }
    getDistanciaTotal() {
        return this.dias.map(d => d.getDistancia()).reduce((x, y) => x + y, 0);
    }
    getNumeroSemana() {
        return this.semana;
    }
    getGrupo() {
        return this.grupo;
    }
    setGrupo(grupo) {
        this.grupo = grupo;
    }
};
__decorate([
    (0, class_transformer_1.Type)(() => entrenamiento_1.Entrenamiento),
    (0, typeorm_1.OneToMany)(() => entrenamiento_1.Entrenamiento, entrenamiento => entrenamiento.microciclo, { nullable: true }),
    __metadata("design:type", Array)
], MicroCiclo.prototype, "dias", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "real" }),
    __metadata("design:type", Number)
], MicroCiclo.prototype, "semana", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => anio_1.Grupo),
    (0, typeorm_1.ManyToOne)(() => anio_1.Grupo),
    __metadata("design:type", anio_1.Grupo)
], MicroCiclo.prototype, "grupo", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => anio_1.Anio),
    (0, typeorm_1.ManyToOne)(() => anio_1.Anio),
    __metadata("design:type", anio_1.Anio)
], MicroCiclo.prototype, "anio", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MicroCiclo.prototype, "init", null);
MicroCiclo = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Number, anio_1.Grupo, anio_1.Anio])
], MicroCiclo);
exports.MicroCiclo = MicroCiclo;
//# sourceMappingURL=microciclo.js.map