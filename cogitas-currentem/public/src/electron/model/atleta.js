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
exports.Sexo = exports.Atleta = void 0;
const class_transformer_1 = require("class-transformer");
const persistable_1 = require("../../frontend/persistence/persistable");
const dates_1 = require("../dates");
const typeConfigs_1 = require("../typeConfigs");
Object.defineProperty(exports, "Sexo", { enumerable: true, get: function () { return typeConfigs_1.Sexo; } });
const entrenamiento_1 = require("./entrenamiento");
const anio_1 = require("./anio");
const typeorm_1 = require("typeorm");
let Atleta = class Atleta extends persistable_1.Persistable {
    altura;
    aniosEntrenamiento;
    carreras;
    entrenamientos;
    fechaNacimiento;
    macroCiclos;
    nombre;
    objetivos;
    peso;
    sexo;
    tests;
    dateGenerator;
    creationDate;
    init() {
        this.macroCiclos = this.macroCiclos === undefined ? [] : this.macroCiclos;
        this.tests = this.tests === undefined ? [] : this.tests;
        this.entrenamientos = this.entrenamientos === undefined ? [] : this.entrenamientos;
        this.carreras = this.carreras === undefined ? [] : this.carreras;
    }
    constructor(nombre, fechaNacimiento, peso, altura, sexo, aniosEntrenamiento, objetivos, dateGenerator) {
        super();
        this.nombre = nombre;
        this.fechaNacimiento = fechaNacimiento;
        this.altura = altura;
        this.sexo = sexo;
        this.aniosEntrenamiento = aniosEntrenamiento;
        this.peso = peso;
        this.objetivos = objetivos;
        this.dateGenerator = dateGenerator === undefined ? new dates_1.DefaultDateGenerator() : dateGenerator;
        this.creationDate = (new Date());
    }
    getAllEntrenamientos() {
        let allEntrenamientos = [];
        allEntrenamientos.push(...this.carreras);
        allEntrenamientos.push(...this.tests);
        allEntrenamientos.push(...this.entrenamientos);
        return allEntrenamientos;
    }
    getRitmoMaximo() {
        let entrenamientos = this.getAllEntrenamientos();
        return entrenamientos.length === 0 ? 0 : entrenamientos.sort((x, y) => x.getPaceMaximo() - y.getPaceMaximo())[0].getPaceMaximo();
    }
    getVelocidadMaxima() {
        return this.getRitmoMaximo() === 0 ? 0 : 1 / this.getRitmoMaximo();
    }
    getRitmoAl(porcentage) {
        return (1 / (1 / this.getRitmoMaximo() * porcentage));
    }
    getDistanciaSemanal() {
        return this.getAllEntrenamientos().filter(e => this.dateGenerator.getSemana() === e.getSemana()).map(x => x.getDistancia()).reduce((x, y) => x + y, 0);
    }
    agregarCarrera(carrera) {
        this.carreras.push(carrera);
    }
    agregarMacroCiclo(macroCiclo) {
        this.macroCiclos.push(macroCiclo);
    }
    agregarTest(test) {
        this.tests.push(test);
    }
    agregarEntrenamiento(nuevoEntrenamiento) {
        this.entrenamientos.push(nuevoEntrenamiento);
    }
    getAniosEntrenando() {
        const crDate = this.creationDate.valueOf();
        return new Date(this.dateGenerator.getHoy() - crDate).getFullYear() - 1970 + 1;
    }
    getAniosEntrenamiento() {
        return this.aniosEntrenamiento + this.getAniosEntrenando();
    }
    getEdad() {
        return new Date(this.dateGenerator.getHoy() - this.fechaNacimiento.valueOf()).getFullYear() - 1970;
    }
    getAltura() {
        return this.altura;
    }
    getNombre() {
        return this.nombre;
    }
    getObjetivos() {
        return this.objetivos;
    }
    getPeso() {
        return this.peso;
    }
    getSexo() {
        return this.sexo;
    }
    getEntrenamientos() {
        return this.entrenamientos;
    }
    getCarreras() {
        return this.carreras;
    }
    getTests() {
        return this.tests;
    }
    getMacroCiclos() {
        return this.macroCiclos;
    }
    getFechaNacimiento() {
        return this.fechaNacimiento;
    }
};
__decorate([
    (0, typeorm_1.Column)({ type: "real" }),
    __metadata("design:type", Number)
], Atleta.prototype, "altura", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "real" }),
    __metadata("design:type", Number)
], Atleta.prototype, "aniosEntrenamiento", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => entrenamiento_1.Entrenamiento),
    (0, typeorm_1.OneToMany)(() => entrenamiento_1.Entrenamiento, entrenamiento => entrenamiento.atleta),
    __metadata("design:type", Array)
], Atleta.prototype, "carreras", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => entrenamiento_1.Entrenamiento),
    (0, typeorm_1.OneToMany)(() => entrenamiento_1.Entrenamiento, entrenamiento => entrenamiento.atleta),
    __metadata("design:type", Array)
], Atleta.prototype, "entrenamientos", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Date),
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], Atleta.prototype, "fechaNacimiento", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => anio_1.Anio),
    (0, typeorm_1.ManyToMany)(() => anio_1.Anio),
    __metadata("design:type", Array)
], Atleta.prototype, "macroCiclos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Atleta.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Atleta.prototype, "objetivos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'real' }),
    __metadata("design:type", Number)
], Atleta.prototype, "peso", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-enum' }),
    __metadata("design:type", String)
], Atleta.prototype, "sexo", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => entrenamiento_1.Entrenamiento),
    (0, typeorm_1.OneToMany)(() => entrenamiento_1.Entrenamiento, entrenamiento => entrenamiento.atleta),
    __metadata("design:type", Array)
], Atleta.prototype, "tests", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Object)
], Atleta.prototype, "dateGenerator", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => entrenamiento_1.Entrenamiento),
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Atleta.prototype, "creationDate", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Atleta.prototype, "init", null);
Atleta = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [String, Date, Number, Number, String, Number, String, Object])
], Atleta);
exports.Atleta = Atleta;
//# sourceMappingURL=atleta.js.map