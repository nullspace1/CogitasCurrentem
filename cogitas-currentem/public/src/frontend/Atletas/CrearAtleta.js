"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtletasCrear = void 0;
const react_1 = __importDefault(require("react"));
const AtletaForm_1 = require("./AtletaForm");
const AtletasCrear = () => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Crear Atleta"),
        react_1.default.createElement(AtletaForm_1.AtletaForm, { id: "" })));
};
exports.AtletasCrear = AtletasCrear;
//# sourceMappingURL=CrearAtleta.js.map