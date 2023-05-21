"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sexo = exports.Atleta = void 0;
const entrenamiento_1 = require("./entrenamiento");
const planificacion_1 = require("./planificacion");
var Sexo;
(function (Sexo) {
    Sexo["Hombre"] = "Hombre";
    Sexo["Mujer"] = "Mujer";
})(Sexo || (Sexo = {}));
exports.Sexo = Sexo;
class Atleta {
    alturaEnCm;
    fechaNacimiento;
    nombre;
    pesoEnKilos;
    sexo;
    aniosEntrenamiento;
    objetivos;
    entrenamientosRealizados;
    mesoCiclos;
    tests;
    ritmoMaximo;
    id;
    constructor(nombre, fechaNacimiento, pesoEnKilos, alturaEnCm, sexo, aniosEntrenamiento, objetivos) {
        this.nombre = nombre;
        this.fechaNacimiento = fechaNacimiento;
        this.alturaEnCm = alturaEnCm;
        this.sexo = sexo;
        this.tests = [];
        this.entrenamientosRealizados = [];
        this.aniosEntrenamiento = aniosEntrenamiento;
        this.mesoCiclos = [];
        this.ritmoMaximo = -1;
        this.pesoEnKilos = pesoEnKilos;
        this.objetivos = objetivos;
    }
    ausencias() {
        return this.entrenamientosRealizados.filter(entrenamiento => entrenamiento.getResultadoEntrenamiento() === entrenamiento_1.Resultado.Ausente);
    }
    realizados() {
        return this.entrenamientosRealizados.filter(entrenamiento => entrenamiento.getResultadoEntrenamiento() === entrenamiento_1.Resultado.Normal);
    }
    distanciaSemanal(fecha) {
        return this.entrenamientosEnSemanaDe(fecha).map((entrenamiento) => entrenamiento.distancia()).reduce((x, y) => x.valueOf() + y.valueOf(), 0);
    }
    entrenamientosEnSemanaDe(fecha) {
        return this.entrenamientosRealizados.filter(e => e.enSemanaDe(fecha));
    }
    registrarEntrenamiento(nuevoEntrenamiento) {
        this.entrenamientosRealizados.push(nuevoEntrenamiento);
    }
    registrarTest(test) {
        this.tests.push(test);
        this.ritmoMaximo = test.paceMaximo();
    }
    calcularRitmoAl(porcentaje) {
        return 1 / (this.ritmoMaximo.valueOf() * porcentaje.valueOf());
    }
    agregarMesociclo(mesociclo) {
        this.mesoCiclos.push(mesociclo);
    }
    getNombre() {
        return this.nombre;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = (id !== -1) ? id : Math.random().toString(16).slice(2);
    }
    getEdad() {
        return;
    }
    toObject() {
        return {
            alturaEnCm: this.alturaEnCm,
            fechaNacimiento: JSON.stringify(this.fechaNacimiento),
            nombre: this.nombre,
            pesoEnKilos: this.pesoEnKilos,
            sexo: this.sexo.toString(),
            aniosEntrenamiento: this.aniosEntrenamiento,
            objetivos: this.objetivos,
            entrenamientosRealizados: this.entrenamientosRealizados.map(e => e.toObject()),
            mesoCiclos: this.mesoCiclos.map(m => m.toObject()),
            tests: this.tests.map(t => t.toObject()),
            ritmomaximo: this.ritmoMaximo,
            id: this.id
        };
    }
    static fromObject(object) {
        var atleta = new Atleta(object.nombre, new Date(object.fechaNacimiento), object.pesoEnKilos, object.alturaEnCm, object.sexo, object.aniosEntrenamiento, object.objetivos);
        object.tests.forEach((t) => atleta.registrarTest(entrenamiento_1.Entrenamiento.fromObject(t)));
        object.entrenamientosRealizados.forEach((e) => atleta.registrarEntrenamiento(entrenamiento_1.Entrenamiento.fromObject(e)));
        object.mesoCiclos.forEach((m) => atleta.agregarMesociclo(planificacion_1.MesoCiclo.fromObject(m)));
        atleta.setId(object.id);
        return atleta;
    }
}
exports.Atleta = Atleta;
//# sourceMappingURL=atleta.js.map