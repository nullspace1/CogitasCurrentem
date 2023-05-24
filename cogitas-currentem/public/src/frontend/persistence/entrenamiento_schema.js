"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntrenamientoSchema = void 0;
const entrenamiento_1 = require("../../electron/model/entrenamiento");
const lap_schema_1 = require("./lap_schema");
const EntrenamientoSchema = {
    entrenamientos: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                comentario: { type: 'string' },
                fecha: { type: 'string', format: 'date-time' },
                resultado: { type: 'string', enum: Object.values(entrenamiento_1.Resultado) },
                laps: {
                    type: 'array',
                    items: lap_schema_1.LapSchema.laps.items
                },
                tipoEntrenamiento: { type: 'string', enum: Object.values(entrenamiento_1.TipoEntrenamiento) }
            }
        }
    }
};
exports.EntrenamientoSchema = EntrenamientoSchema;
//# sourceMappingURL=entrenamiento_schema.js.map