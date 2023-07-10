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
exports.EntrenamientosList = exports.AtletaPag = void 0;
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const typeConfigs_1 = require("../../electron/typeConfigs");
const anio_1 = require("../../electron/model/anio");
const UnitSelector_1 = require("./UnitSelector");
const PersistenceConnection_1 = require("../PersistenceConnection");
const AtletaPag = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const [atletaInfo, setAtletaInfo] = (0, react_1.useState)(null);
    (0, react_1.useLayoutEffect)(() => {
        const fetch = async () => {
            const atleta = await new PersistenceConnection_1.DatabaseConnection().getAtleta(parseInt(id));
            setAtletaInfo(atleta);
        };
        fetch();
    }, [id]);
    if (atletaInfo == null)
        return (react_1.default.createElement("div", null));
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null,
            atletaInfo.nombre,
            " "),
        react_1.default.createElement("div", null,
            " ",
            react_1.default.createElement(react_router_dom_1.Link, { to: './edicion' }, " Editar Informacion "),
            " "),
        react_1.default.createElement("div", null,
            react_1.default.createElement(InformacionPersonal, { atleta: atletaInfo }),
            react_1.default.createElement(InformacionAtleta, { atleta: atletaInfo }),
            react_1.default.createElement(EntrenamientosList, { list: atletaInfo.entrenamientos, nombre: "Entrenamientos realizados" }),
            react_1.default.createElement(EntrenamientosList, { list: atletaInfo.carreras, nombre: "Carreras participadas" }),
            react_1.default.createElement(EntrenamientosList, { list: atletaInfo.tests, nombre: "Tests realizados" }),
            react_1.default.createElement(MacroCiclo, { atleta: atletaInfo }))));
};
exports.AtletaPag = AtletaPag;
function MacroCiclo({ atleta }) {
    const [macrociclo, setMacrociclo] = (0, react_1.useState)(atleta.macroCiclos);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const crearMacrociclo = async () => {
        const anio = new anio_1.Anio((new Date().getFullYear()));
        atleta.agregarMacroCiclo(anio);
        // await new DatabaseInterface(Tables.macrociclo).save(anio);
        //await new DatabaseInterface(Tables.atleta).save(atleta);
        navigate('./macrociclo/' + anio.id);
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h2", null, "Macrociclos"),
        react_1.default.createElement("button", { onClick: () => crearMacrociclo() }, "Crear Nuevo"),
        react_1.default.createElement("ul", null, macrociclo.map(m => react_1.default.createElement("ul", null,
            react_1.default.createElement("li", null,
                "Anio: ",
                m.getAnio()),
            react_1.default.createElement(react_router_dom_1.Link, { to: './macrociclo/' + m.id }, " Ver "))))));
}
function InformacionPersonal({ atleta }) {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h2", null, "Informacion Personal"),
        react_1.default.createElement("ul", null,
            react_1.default.createElement("li", null,
                "Edad:   ",
                atleta.getEdad(),
                " "),
            react_1.default.createElement("li", null,
                "Peso: ",
                react_1.default.createElement(UnitSelector_1.UnitSelector, { value: atleta.peso, converter: new typeConfigs_1.WeightConverter() })),
            react_1.default.createElement("li", null,
                "Altura: ",
                react_1.default.createElement(UnitSelector_1.UnitSelector, { value: atleta.altura, converter: new typeConfigs_1.DistanceConverter() }),
                " "),
            react_1.default.createElement("li", null,
                "Sexo: ",
                atleta.sexo.toString()))));
}
function InformacionAtleta({ atleta }) {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h2", null, "Informacion Atletismo"),
        react_1.default.createElement("ul", null,
            react_1.default.createElement("li", null,
                "A\u00F1os de entrenamiento: ",
                atleta.getAniosEntrenando()),
            react_1.default.createElement("li", null,
                "Objetivo Actual: ",
                atleta.objetivos),
            react_1.default.createElement("li", null,
                "Distancia Semanal: ",
                react_1.default.createElement(UnitSelector_1.UnitSelector, { value: atleta.getDistanciaSemanal(), converter: new typeConfigs_1.DistanceConverter() })),
            react_1.default.createElement("li", null,
                "Ritmo Maximo: ",
                react_1.default.createElement(UnitSelector_1.UnitSelector, { value: atleta.getRitmoMaximo(), converter: new typeConfigs_1.PaceConverter() })))));
}
function EntrenamientosList({ list, nombre }) {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h2", null, nombre),
        react_1.default.createElement("div", null,
            react_1.default.createElement("div", null,
                react_1.default.createElement(react_router_dom_1.Link, { to: './entrenamientos/nuevo' }, " Agregar "),
                react_1.default.createElement(react_router_dom_1.Link, { to: './entrenamientos' }, " Ver Todos ")),
            react_1.default.createElement("ul", null, list.map((e, index) => react_1.default.createElement("li", null,
                react_1.default.createElement("ul", null,
                    react_1.default.createElement("li", null,
                        "Semana: ",
                        e.getSemana()),
                    react_1.default.createElement("li", null,
                        "Dia: ",
                        e.getDia()),
                    react_1.default.createElement("li", null,
                        "Resultado: ",
                        e.getResultado().toString()),
                    react_1.default.createElement("li", null,
                        "Distancia Total: ",
                        react_1.default.createElement(UnitSelector_1.UnitSelector, { value: e.getDistancia(), converter: new typeConfigs_1.DistanceConverter() }))),
                react_1.default.createElement(react_router_dom_1.Link, { to: './entrenamientos/' + e.id }, "Ver")))))));
}
exports.EntrenamientosList = EntrenamientosList;
//# sourceMappingURL=AtletaIndividual.js.map