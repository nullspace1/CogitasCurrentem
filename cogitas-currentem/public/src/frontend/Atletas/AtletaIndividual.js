"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtletaPag = void 0;
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const persistence_1 = require("../persistence/persistence");
const AtletaPag = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const [atletaInfo, setAtletaInfo] = (0, react_1.useState)(null);
    (0, react_1.useLayoutEffect)(() => {
        const fetch = async () => {
            const atletas = await new persistence_1.DatabaseInterface(persistence_1.ExistingDatabase.atleta).getAll();
            const atleta = atletas.filter(x => x.id == id)[0];
            setAtletaInfo(atleta);
        };
        fetch();
    }, []);
    if (atletaInfo == null)
        return (react_1.default.createElement("div", null));
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null,
            atletaInfo.nombre,
            " "),
        react_1.default.createElement("div", { className: "button" },
            " ",
            react_1.default.createElement(react_router_dom_1.Link, { to: '/editar' }, " Editar Informacion "),
            " "),
        react_1.default.createElement("div", { className: "infoBox" },
            react_1.default.createElement("h2", null, "Informacion Personal"),
            react_1.default.createElement("ul", null,
                react_1.default.createElement("li", null,
                    "Edad:   ",
                    atletaInfo.getEdad(),
                    " "),
                react_1.default.createElement("li", null,
                    "Peso: ",
                    atletaInfo.pesoEnKilos,
                    " kg"),
                react_1.default.createElement("li", null,
                    "Altura: ",
                    atletaInfo.alturaEnCm,
                    " cm"),
                react_1.default.createElement("li", null,
                    "Sexo: ",
                    atletaInfo.sexo.toString())),
            react_1.default.createElement("div", { className: "infoBox" },
                react_1.default.createElement("h2", null, "Informacion Atletismo"),
                react_1.default.createElement("ul", null,
                    react_1.default.createElement("li", null,
                        "A\u00F1os de entrenamiento: ",
                        atletaInfo.getAniosEntrenamiento()),
                    react_1.default.createElement("li", null,
                        "Objetivo Actual: ",
                        atletaInfo.objetivos),
                    react_1.default.createElement("li", null,
                        "Kilometros Semanales: ",
                        atletaInfo.distanciaSemanal(new Date()) / 1000,
                        " km"),
                    react_1.default.createElement("li", null,
                        "Ritmo Maximo: ",
                        atletaInfo.calcularRitmoAl(1),
                        " "))),
            react_1.default.createElement("h2", null, "Entrenamientos Realizados"),
            react_1.default.createElement("div", { className: "infoBox" },
                react_1.default.createElement("div", { className: "infoBoxHeader" },
                    react_1.default.createElement(react_router_dom_1.Link, { to: '/entrenamientos/nuevo' }, " Agregar "),
                    react_1.default.createElement(react_router_dom_1.Link, { to: '/entrenamientos' }, " Ver Todos ")),
                react_1.default.createElement("ul", null, atletaInfo.entrenamientosRealizados.map(e => react_1.default.createElement("li", null,
                    react_1.default.createElement("ul", null,
                        react_1.default.createElement("li", null,
                            "Fecha: ",
                            e.getFecha().toDateString()),
                        react_1.default.createElement("li", null,
                            "Resultado: ",
                            e.getResultadoEntrenamiento().toString())),
                    react_1.default.createElement(react_router_dom_1.Link, { to: '/entrenamientos/' + e.getFecha().toDateString() }, "Ver"))))))));
};
exports.AtletaPag = AtletaPag;
//# sourceMappingURL=AtletaIndividual.js.map