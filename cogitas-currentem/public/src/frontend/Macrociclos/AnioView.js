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
exports.AnioView = void 0;
const react_1 = __importStar(require("react"));
require("../css/CrearMacrociclo.css");
const anio_1 = require("../../electron/model/anio");
const react_router_dom_1 = require("react-router-dom");
const persistence_1 = require("../persistence/persistence");
const UnitSelector_1 = require("../Atletas/UnitSelector");
const typeConfigs_1 = require("../../electron/typeConfigs");
function AnioView() {
    const { id } = (0, react_router_dom_1.useParams)();
    const [usedMacrociclo, setMacrociclo] = (0, react_1.useState)(null);
    const [anio, setAnio] = (0, react_1.useState)(0);
    const [groupName, setName] = (0, react_1.useState)("");
    const [grupos, setGrupos] = (0, react_1.useState)([]);
    const [lowerBound, setLowerBound] = (0, react_1.useState)(-1);
    const [upperBound, setUpperBound] = (0, react_1.useState)(-1);
    const actualizarAnio = async (anioNuevo) => {
        usedMacrociclo.setAnio(anioNuevo);
        setAnio(anioNuevo);
        await new persistence_1.DatabaseInterface(persistence_1.Tables.macrociclo).update(usedMacrociclo);
    };
    const setBound = (x) => {
        if (lowerBound !== -1 && upperBound !== -1) {
            setLowerBound(x);
            setUpperBound(-1);
        }
        else if (lowerBound === -1) {
            setLowerBound(x);
        }
        else if (x < lowerBound) {
            setUpperBound(lowerBound);
            setLowerBound(x);
        }
        else {
            setUpperBound(x);
        }
    };
    const asignar = async () => {
        usedMacrociclo.asignarGrupoA(new anio_1.Grupo(lowerBound, upperBound, groupName));
        await new persistence_1.DatabaseInterface(persistence_1.Tables.macrociclo).update(usedMacrociclo);
        setGrupos(usedMacrociclo.getGrupos());
        setLowerBound(-1);
        setUpperBound(-1);
    };
    const stringToColor = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#';
        for (let i = 0; i < 3; i++) {
            let value = (hash >> (i * 8)) & 0xFF;
            color += ('00' + value.toString(16)).substr(-2);
        }
        return color;
    };
    const getColor = (i) => {
        if ((i >= lowerBound && i <= upperBound) || i === lowerBound || i === upperBound)
            return 'white';
        let grupo = usedMacrociclo.getGrupoFor(i);
        if (grupo == null)
            return 'grey';
        else
            return stringToColor(grupo.nombre);
    };
    (0, react_1.useLayoutEffect)(() => {
        const fetch = async () => {
            const macrociclo = await new persistence_1.DatabaseInterface(persistence_1.Tables.macrociclo).getById(id);
            setMacrociclo(macrociclo);
            setAnio(macrociclo.getAnio());
        };
        fetch();
    }, [id]);
    if (usedMacrociclo == null)
        return (react_1.default.createElement("div", null));
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Plan de Entrenamiento"),
        react_1.default.createElement("label", { htmlFor: "anio" }, "A\u00F1o"),
        react_1.default.createElement("input", { type: 'number', name: "anio", onChange: (event) => actualizarAnio(event.target.valueAsNumber), value: anio }),
        lowerBound !== -1 && upperBound !== -1 && react_1.default.createElement("div", null,
            " ",
            react_1.default.createElement("label", null, "Nombre Grupo"),
            " ",
            react_1.default.createElement("input", { minLength: 1, value: groupName, onChange: (event) => setName(event.target.value) }),
            react_1.default.createElement("button", { onClick: asignar }, " Asignar Grupo "),
            " "),
        react_1.default.createElement("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' } }, Array.from({ length: 52 }, (_, index) => index + 1).map(i => react_1.default.createElement("div", { style: {
                border: '1px solid black',
                padding: '10px',
                backgroundColor: getColor(i)
            } },
            react_1.default.createElement("p", null,
                "Semana: ",
                i),
            react_1.default.createElement(react_router_dom_1.Link, { to: "./semana/" + i }, "Ver"),
            react_1.default.createElement("button", { onClick: () => setBound(i) }, "Set")))),
        react_1.default.createElement("h3", null, "Grupos:"),
        grupos.map(g => react_1.default.createElement("div", null,
            react_1.default.createElement("ul", null,
                react_1.default.createElement("li", null,
                    "Nombre: ",
                    g.nombre),
                react_1.default.createElement("li", null,
                    "Comienzo: ",
                    g.semanaComienzo),
                react_1.default.createElement("li", null,
                    "Fin: ",
                    g.semanaFin),
                react_1.default.createElement("li", null,
                    "Distancia Total: ",
                    react_1.default.createElement(UnitSelector_1.UnitSelector, { value: g.getDistanciaTotal(), converter: new typeConfigs_1.DistanceConverter() })))))));
}
exports.AnioView = AnioView;
//# sourceMappingURL=AnioView.js.map