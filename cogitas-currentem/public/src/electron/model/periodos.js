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
exports.Periodo = void 0;
const class_transformer_1 = require("class-transformer");
const mesociclos_1 = require("./mesociclos");
class Periodo {
    mesoCiclos;
    semanaComienzo;
    semanaFin;
    nombre;
    constructor(semanaComienzo, semanaFin, nombre) {
        this.semanaComienzo = semanaComienzo;
        this.semanaFin = semanaFin;
        this.mesoCiclos = [];
    }
    agregarMesoCiclo(mesoCiclo) {
        this.mesoCiclos.push(mesoCiclo);
    }
    getNombre() {
        return this.nombre;
    }
    getSemanaComienzo() {
        return this.semanaComienzo;
    }
    getSemanaFin() {
        return this.semanaFin;
    }
}
__decorate([
    (0, class_transformer_1.Type)(() => mesociclos_1.MesoCiclo),
    __metadata("design:type", Array)
], Periodo.prototype, "mesoCiclos", void 0);
exports.Periodo = Periodo;
//# sourceMappingURL=periodos.js.map