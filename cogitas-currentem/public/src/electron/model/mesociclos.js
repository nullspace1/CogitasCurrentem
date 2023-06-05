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
exports.MesoCiclo = void 0;
const class_transformer_1 = require("class-transformer");
const microciclos_1 = require("./microciclos");
const persistable_1 = require("../../frontend/persistence/persistable");
class MesoCiclo extends persistable_1.Persistable {
    microciclos;
    semanaComienzo;
    semanaFin;
    nombre;
    constructor(semanaComienzo, semanaFin, nombre) {
        super();
        this.semanaComienzo = semanaComienzo;
        this.semanaFin = semanaFin;
        this.nombre = nombre;
        this.microciclos = [];
    }
    agregarMicrociclo(microciclo) {
        this.microciclos.push(microciclo);
    }
    getDistanciaTotal() {
        this.microciclos.map(m => m.getDistanciaTotal()).reduce((x, y) => x + y, 0);
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
    (0, class_transformer_1.Type)(() => microciclos_1.MicroCiclo),
    __metadata("design:type", Array)
], MesoCiclo.prototype, "microciclos", void 0);
exports.MesoCiclo = MesoCiclo;
//# sourceMappingURL=mesociclos.js.map