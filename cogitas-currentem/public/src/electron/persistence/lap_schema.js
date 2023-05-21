"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LapSchema = void 0;
const LapSchema = {
    laps: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                distancia: { type: 'number' },
                tiempo: { type: 'number' },
            },
        },
    },
};
exports.LapSchema = LapSchema;
//# sourceMappingURL=lap_schema.js.map