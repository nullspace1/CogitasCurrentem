"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemas = void 0;
const planificacion_schema_1 = require("./planificacion_schema");
const atleta_schema_1 = require("./atleta_schema");
const entrenamiento_schema_1 = require("./entrenamiento_schema");
const lap_schema_1 = require("./lap_schema");
exports.schemas = {
    ...atleta_schema_1.AtletaSchema,
    ...planificacion_schema_1.MesoCicloSchema,
    ...planificacion_schema_1.MicroCicloSchema,
    ...entrenamiento_schema_1.EntrenamientoSchema,
    ...lap_schema_1.LapSchema
};
//# sourceMappingURL=db.js.map