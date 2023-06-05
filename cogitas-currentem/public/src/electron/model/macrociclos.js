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
exports.MacroCiclo = void 0;
const class_transformer_1 = require("class-transformer");
const periodos_1 = require("./periodos");
const persistable_1 = require("../../frontend/persistence/persistable");
class MacroCiclo extends persistable_1.Persistable {
    anio;
    periodos;
    nombre;
    constructor(anio, nombre) {
        super();
        this.anio = anio;
        this.nombre = nombre;
        this.periodos = [];
    }
    agregarPeriodo(periodo) {
        this.periodos.push(periodo);
    }
    getNombre() {
        return this.nombre;
    }
    getAnio() {
        return this.anio;
    }
    getPeriodos() {
        return this.periodos;
    }
}
__decorate([
    (0, class_transformer_1.Type)(() => periodos_1.Periodo),
    __metadata("design:type", Array)
], MacroCiclo.prototype, "periodos", void 0);
exports.MacroCiclo = MacroCiclo;
//# sourceMappingURL=macrociclos.js.map