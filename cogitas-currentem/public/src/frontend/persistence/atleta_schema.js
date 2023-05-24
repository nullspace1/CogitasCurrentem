"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtletaSchema = exports.AtletaDB = void 0;
const atleta_1 = require("../../electron/model/atleta");
const entrenamiento_schema_1 = require("./entrenamiento_schema");
const planificacion_schema_1 = require("./planificacion_schema");
const AtletaSchema = {
    atletas: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                alturaEnCm: { type: 'number' },
                fechaNacimiento: { type: "string" },
                nombre: { type: 'string' },
                pesoEnKilos: { type: 'number' },
                sexo: { type: 'string' },
                aniosEntrenamiento: { type: 'number' },
                objetivos: { type: 'string' },
                entrenamientosRealizados: {
                    type: 'array',
                    items: entrenamiento_schema_1.EntrenamientoSchema.entrenamientos.items
                },
                mesoCilos: { type: 'array',
                    items: planificacion_schema_1.MesoCicloSchema.mesociclos.items },
                tests: {
                    type: 'array',
                    items: entrenamiento_schema_1.EntrenamientoSchema.entrenamientos.items
                },
                ritmoMaximo: { type: 'number' },
                id: { type: 'string' },
                fechaCreacion: { type: "string" }
            }
        }
    }
};
exports.AtletaSchema = AtletaSchema;
class AtletaDB {
    async getAll() {
        const atletas = await window.electron.getAtletas();
        return atletas.map(a => atleta_1.Atleta.fromObject(a));
    }
    async setAtletas(atletas) {
        window.electron.setAtletas(atletas.map(a => a.toObject()));
    }
    async add(atleta) {
        const atletas = await this.getAll();
        atleta.setId(-1);
        atleta.setFechaCreacion(new Date(0));
        atletas.push(atleta);
        this.setAtletas(atletas);
    }
    async delete(atleta) {
        var atletas = await this.getAll();
        var atletasFilt = atletas.filter(a => a.getId() !== atleta.getId());
        await this.setAtletas(atletasFilt);
        return atletasFilt;
    }
}
exports.AtletaDB = AtletaDB;
//# sourceMappingURL=atleta_schema.js.map