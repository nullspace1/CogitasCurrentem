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
exports.Anio = exports.Grupo = void 0;
const class_transformer_1 = require("class-transformer");
const microciclo_1 = require("./microciclo");
const persistable_1 = require("../../frontend/persistence/persistable");
const typeorm_1 = require("typeorm");
const MICROCICLOS_POR_ANIO = 52;
let Grupo = class Grupo extends persistable_1.Persistable {
    semanaComienzo;
    semanaFin;
    nombre;
    microciclos;
    init() {
        if (this.microciclos === undefined)
            this.microciclos = [];
    }
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
};
__decorate([
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], Grupo.prototype, "semanaComienzo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], Grupo.prototype, "semanaFin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Grupo.prototype, "nombre", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => microciclo_1.MicroCiclo),
    (0, typeorm_1.OneToMany)(() => microciclo_1.MicroCiclo, microciclo => microciclo.anio),
    __metadata("design:type", Array)
], Grupo.prototype, "microciclos", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Grupo.prototype, "init", null);
Grupo = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Number, Number, String])
], Grupo);
exports.Grupo = Grupo;
let Anio = class Anio extends persistable_1.Persistable {
    microciclos;
    anio;
    grupos;
    init() {
        if (this.microciclos === undefined) {
            this.microciclos = [];
            for (let i = 0; i < MICROCICLOS_POR_ANIO; i++) {
                this.microciclos.push(new microciclo_1.MicroCiclo(i + 1, null, this));
            }
        }
        if (this.grupos === undefined)
            this.grupos = [];
    }
    constructor(anio) {
        super();
        this.anio = anio;
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
};
__decorate([
    (0, class_transformer_1.Type)(() => microciclo_1.MicroCiclo),
    (0, typeorm_1.OneToMany)(() => microciclo_1.MicroCiclo, microcilo => microcilo.anio),
    __metadata("design:type", Array)
], Anio.prototype, "microciclos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], Anio.prototype, "anio", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Grupo),
    __metadata("design:type", Array)
], Anio.prototype, "grupos", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Anio.prototype, "init", null);
Anio = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Number])
], Anio);
exports.Anio = Anio;
//# sourceMappingURL=anio.js.map