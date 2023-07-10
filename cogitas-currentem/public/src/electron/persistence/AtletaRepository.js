"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtletaRepository = void 0;
const atleta_1 = require("../model/atleta");
const persistence_1 = require("./persistence");
const dates_1 = require("../dates");
class AtletaRepository extends persistence_1.Repository {
    entrenamientoRepository;
    anioRepository;
    constructor(knex, entrenamientoRepository, anioRepository) {
        super(knex);
        this.entrenamientoRepository = entrenamientoRepository;
        this.anioRepository = anioRepository;
        this.TABLE_NAME = 'Atleta';
    }
    async save(object) {
        object.carreras.forEach(c => this.entrenamientoRepository.saveCarrera(object, c));
        object.entrenamientos.forEach(c => this.entrenamientoRepository.saveEntrenamiento(object, c));
        object.tests.forEach(t => this.entrenamientoRepository.saveTests(object, t));
        object.macroCiclos.forEach(m => this.anioRepository.saveAnio(object, m));
        return super.save(object);
    }
    async delete(object) {
        super.delete(object);
    }
    toData(object) {
        return {
            nombre: object.nombre,
            objetivos: object.objetivos,
            sexo: object.sexo.toString(),
            altura: object.altura,
            peso: object.peso,
            anioComienzoEntrenamiento: object.anioComienzoEntrenamiento,
            fechaNacimiento: object.fechaNacimiento
        };
    }
    toObject(data) {
        const atleta = new atleta_1.Atleta(data.nombre, new Date(data.fechaNacimiento), data.peso, data.altura, atleta_1.Sexo[data.sexo], data.anioComienzoEntrenamiento, data.objetivos, new dates_1.DefaultDateGenerator());
        atleta.id = data.id;
        return atleta;
    }
}
exports.AtletaRepository = AtletaRepository;
//# sourceMappingURL=AtletaRepository.js.map