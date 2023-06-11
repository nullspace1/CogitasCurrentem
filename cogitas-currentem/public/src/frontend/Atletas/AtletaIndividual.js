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
const persistence_1 = require("../persistence/persistence");
const typeConfigs_1 = require("../../electron/typeConfigs");
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
            atletaInfo.getNombre(),
            " "),
        react_1.default.createElement("div", null,
            " ",
            react_1.default.createElement(react_router_dom_1.Link, { to: './edicion' }, " Editar Informacion "),
            " "),
        react_1.default.createElement("div", null,
            react_1.default.createElement(InformacionPersonal, { atleta: atletaInfo }),
            react_1.default.createElement(InformacionAtleta, { atleta: atletaInfo }),
            react_1.default.createElement(EntrenamientosList, { list: atletaInfo.getEntrenamientos(), nombre: "Entrenamientos realizados" }),
            react_1.default.createElement(EntrenamientosList, { list: atletaInfo.getCarreras(), nombre: "Carreras participadas" }),
            react_1.default.createElement(EntrenamientosList, { list: atletaInfo.getTests(), nombre: "Tests realizados" }),
            react_1.default.createElement(MacroCiclo, { atleta: atletaInfo }))));
};
exports.AtletaPag = AtletaPag;
function MacroCiclo({ atleta }) {
    let macrociclo = atleta.getMacroCiclos();
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h2", null, "Macrociclos"),
        react_1.default.createElement(react_router_dom_1.Link, { to: '/macrociclo/nuevo', state: { ids: [atleta.id] } }, "Crear Nuevo"),
        react_1.default.createElement("ul", null, macrociclo.map(m => react_1.default.createElement("ul", null,
            react_1.default.createElement("li", null,
                "Nombre: ",
                m.getNombre()),
            react_1.default.createElement("li", null,
                "Anio: ",
                m.getAnio()),
            react_1.default.createElement(react_router_dom_1.Link, { to: '/macrociclo/' + m.id }, " Ver "))))));
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
                react_1.default.createElement(UnitSelector, { value: atleta.getPeso(), converter: new typeConfigs_1.WeightConverter() })),
            react_1.default.createElement("li", null,
                "Altura: ",
                react_1.default.createElement(UnitSelector, { value: atleta.getAltura(), converter: new typeConfigs_1.DistanceConverter() }),
                " "),
            react_1.default.createElement("li", null,
                "Sexo: ",
                atleta.getSexo().toString()))));
}
function InformacionAtleta({ atleta }) {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h2", null, "Informacion Atletismo"),
        react_1.default.createElement("ul", null,
            react_1.default.createElement("li", null,
                "A\u00F1os de entrenamiento: ",
                atleta.getAniosEntrenamiento()),
            react_1.default.createElement("li", null,
                "Objetivo Actual: ",
                atleta.getObjetivos()),
            react_1.default.createElement("li", null,
                "Kilometros Semanales: ",
                react_1.default.createElement(UnitSelector, { value: atleta.getDistanciaSemanal(), converter: new typeConfigs_1.DistanceConverter() })),
            react_1.default.createElement("li", null,
                "Ritmo Maximo: ",
                react_1.default.createElement(UnitSelector, { value: atleta.getRitmoMaximo(), converter: new typeConfigs_1.PaceConverter() })))));
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
                        "Cantidad de kilometros: ",
                        react_1.default.createElement(UnitSelector, { value: e.getDistancia(), converter: new typeConfigs_1.DistanceConverter() }))),
                react_1.default.createElement(react_router_dom_1.Link, { to: './entrenamientos/' + e.id }, "Ver")))))));
}
exports.EntrenamientosList = EntrenamientosList;
const UnitSelector = ({ value, converter }) => {
    const [selectedUnit, setSelectedUnit] = (0, react_1.useState)(converter.default());
    return (react_1.default.createElement("div", null,
        converter.convert(value, selectedUnit),
        react_1.default.createElement("select", { value: selectedUnit, onChange: (e) => setSelectedUnit(e.target.value) }, converter.getList().map((unit) => (react_1.default.createElement("option", { value: unit, key: unit }, unit))))));
};
exports.default = UnitSelector;
//# sourceMappingURL=AtletaIndividual.js.map