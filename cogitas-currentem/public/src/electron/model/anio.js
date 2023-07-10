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
exports.Grupo = exports.Anio = void 0;
const class_transformer_1 = require("class-transformer");
const microciclo_1 = require("./microciclo");
const persistence_1 = require("../persistence/persistence");
const MICROCICLOS_POR_ANIO = 52;
class Anio extends persistence_1.Persistable {
    microciclos;
    anio;
    grupos;
    constructor(anio) {
        super();
        this.anio = anio;
        this.microciclos = [];
        for (let i = 0; i < MICROCICLOS_POR_ANIO; i++) {
            this.microciclos.push(new microciclo_1.MicroCiclo(i));
        }
    }
    agregarMicrociclo(microciclo) {
        this.microciclos.push(microciclo);
    }
    getAnio() {
        return this.anio;
    }
    getMicrociclos() {
        return this.microciclos;
    }
    getGrupos() {
        return this.grupos;
    }
    asignarGrupoA(grupo) {
        this.grupos = this.grupos.filter(g => !(g.contiene(grupo.semanaComienzo) || g.contiene(grupo.semanaFin)));
        grupo.addMicrociclos(this.microciclos.filter(m => grupo.contiene(m.getNumeroSemana())));
        this.grupos.push(grupo);
    }
    getGrupoFor(semana) {
        let g = this.grupos.filter(g => g.contiene(semana))[0];
        return g === undefined ? null : g;
    }
    setAnio(anio) {
        this.anio = anio;
    }
}
__decorate([
    (0, class_transformer_1.Type)(() => microciclo_1.MicroCiclo),
    __metadata("design:type", Array)
], Anio.prototype, "microciclos", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Grupo),
    __metadata("design:type", Array)
], Anio.prototype, "grupos", void 0);
exports.Anio = Anio;
class Grupo extends persistence_1.Persistable {
    semanaComienzo;
    semanaFin;
    nombre;
    microciclos;
    constructor(semanaComienzo, semanaFin, nombre) {
        super();
        this.semanaComienzo = semanaComienzo;
        this.semanaFin = semanaFin;
        this.nombre = nombre;
    }
    contiene(semana) {
        return this.semanaComienzo <= semana && semana <= this.semanaFin;
    }
    addMicrociclos(microciclo) {
        this.microciclos = microciclo;
    }
    getDistanciaTotal() {
        return this.microciclos.map(m => m.getDistanciaTotal()).reduce((x, y) => x + y);
    }
}
__decorate([
    (0, class_transformer_1.Type)(() => microciclo_1.MicroCiclo),
    __metadata("design:type", Array)
], Grupo.prototype, "microciclos", void 0);
exports.Grupo = Grupo;
//# sourceMappingURL=anio.js.map