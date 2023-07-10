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
const dates_1 = require("../dates");
const typeConfigs_1 = require("../typeConfigs");
Object.defineProperty(exports, "Sexo", { enumerable: true, get: function () { return typeConfigs_1.Sexo; } });
const entrenamiento_1 = require("./entrenamiento");
const anio_1 = require("./anio");
const persistence_1 = require("../persistence/persistence");
class Atleta extends persistence_1.Persistable {
    nombre;
    objetivos;
    peso;
    sexo;
    altura;
    anioComienzoEntrenamiento;
    fechaNacimiento;
    carreras;
    entrenamientos;
    tests;
    macroCiclos;
    dateGenerator;
    constructor(nombre, fechaNacimiento, peso, altura, sexo, anioComienzoEntrenamiento, objetivos, dateGenerator) {
        super();
        this.nombre = nombre;
        this.fechaNacimiento = fechaNacimiento;
        this.altura = altura;
        this.sexo = sexo;
        this.anioComienzoEntrenamiento = anioComienzoEntrenamiento;
        this.peso = peso;
        this.objetivos = objetivos;
        this.dateGenerator = dateGenerator;
        this.carreras = [];
        this.entrenamientos = [];
        this.tests = [];
        this.macroCiclos = [];
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
        return this.dateGenerator.getAnioActual() - this.anioComienzoEntrenamiento;
    }
    getEdad() {
        return this.dateGenerator.getAnioActual() - this.fechaNacimiento.getFullYear();
    }
}
__decorate([
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], Atleta.prototype, "fechaNacimiento", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => entrenamiento_1.Entrenamiento),
    __metadata("design:type", Array)
], Atleta.prototype, "carreras", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => entrenamiento_1.Entrenamiento),
    __metadata("design:type", Array)
], Atleta.prototype, "entrenamientos", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => entrenamiento_1.Entrenamiento),
    __metadata("design:type", Array)
], Atleta.prototype, "tests", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => anio_1.Anio),
    __metadata("design:type", Array)
], Atleta.prototype, "macroCiclos", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => dates_1.DefaultDateGenerator),
    __metadata("design:type", dates_1.DefaultDateGenerator)
], Atleta.prototype, "dateGenerator", void 0);
exports.Atleta = Atleta;
//# sourceMappingURL=atleta.js.map