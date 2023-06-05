"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditarAtleta = void 0;
const react_1 = __importDefault(require("react"));
const AtletaForm_1 = require("./AtletaForm");
const react_router_dom_1 = require("react-router-dom");
function EditarAtleta() {
    const { id } = (0, react_router_dom_1.useParams)();
    return (react_1.default.createElement("div", null,
        "id is: ",
        id,
        react_1.default.createElement(AtletaForm_1.AtletaForm, { id: id })));
}
exports.EditarAtleta = EditarAtleta;
//# sourceMappingURL=EditarAtleta.js.map