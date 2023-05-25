"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtletaSchema = void 0;
const entrenamiento_schema_1 = require("./entrenamiento_schema");
const planificacion_schema_1 = require("./planificacion_schema");
const AtletaSchema = {
    atleta: {
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
//# sourceMappingURL=atleta_schema.js.map