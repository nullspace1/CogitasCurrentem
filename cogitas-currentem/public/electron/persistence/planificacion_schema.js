"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicroCicloSchema = exports.MesoCicloSchema = void 0;
const entrenamiento_schema_1 = require("./entrenamiento_schema");
const MicroCicloSchema = {
    microciclos: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                fechaComienzo: { type: 'string', format: 'date-time' },
                fechaFinalizacion: { type: 'string', format: 'date-time' },
                dias: {
                    type: 'array',
                    items: entrenamiento_schema_1.EntrenamientoSchema.entrenamientos.items
                }
            }
        }
    }
};
exports.MicroCicloSchema = MicroCicloSchema;
const MesoCicloSchema = {
    mesociclos: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                fechaComienzo: { type: 'string', format: 'date-time' },
                fechaFinalizacion: { type: 'string', format: 'date-time' },
                microciclos: {
                    type: 'array',
                    items: MicroCicloSchema.microciclos.items
                }
            }
        }
    }
};
exports.MesoCicloSchema = MesoCicloSchema;
//# sourceMappingURL=planificacion_schema.js.map