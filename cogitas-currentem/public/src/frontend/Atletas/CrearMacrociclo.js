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
exports.MacroCicloCrear = void 0;
const react_1 = __importStar(require("react"));
require("../css/CrearMacrociclo.css");
const macrociclos_1 = require("../../electron/model/macrociclos");
const periodos_1 = require("../../electron/model/periodos");
const react_router_dom_1 = require("react-router-dom");
const persistence_1 = require("../persistence/persistence");
const MacroCicloCrear = () => {
    let navigate = (0, react_router_dom_1.useNavigate)();
    const [prevBoxes, setPrevBoxes] = (0, react_1.useState)([]);
    const { id } = (0, react_router_dom_1.useParams)();
    const initialBoxes = Array.from({ length: 52 }, (_, i) => ({ id: i + 1, selected: false, submitted: false }));
    const [boxes, setBoxes] = (0, react_1.useState)(initialBoxes);
    const [startBox, setStartBox] = (0, react_1.useState)(null);
    const [endBox, setEndBox] = (0, react_1.useState)(null);
    const [idm, setIdm] = (0, react_1.useState)();
    const [listPeriodos, setPeriodos] = (0, react_1.useState)([]);
    const [nombreMacrociclo, setNombreMacrociclo] = (0, react_1.useState)('');
    const [nombrePeriodo, setNombrePeriodo] = (0, react_1.useState)('');
    const [anio, setAnio] = (0, react_1.useState)(new Date().getFullYear());
    const selectBoxes = (start, end) => {
        const [lower, upper] = start <= end ? [start, end] : [end, start];
        setBoxes(boxes.map((box) => box.id >= lower && box.id <= upper ? { ...box, selected: true } : { ...box, selected: false }));
    };
    const handleBoxClick = (id) => {
        const clickedBox = boxes.find(box => box.id === id);
        if (clickedBox && clickedBox.submitted) {
            return;
        }
        if (startBox === null) {
            setStartBox(id);
            selectBoxes(id, id);
        }
        else if (endBox === null) {
            if (boxes.slice(Math.min(startBox, id), Math.max(startBox, id)).some(box => box.submitted)) {
                return;
            }
            setEndBox(id);
            selectBoxes(startBox, id);
        }
        else {
            handleClear();
            setStartBox(id);
            selectBoxes(id, id);
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (startBox !== null && endBox !== null) {
            prevBoxes.push(boxes.map(box => ({ ...box, selected: false })));
            const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
            const [lower, upper] = startBox <= endBox ? [startBox, endBox] : [endBox, startBox];
            setBoxes(boxes.map(box => box.id >= lower && box.id <= upper ? { ...box, selected: false, submitted: true, color } : box));
            setStartBox(null);
            setEndBox(null);
            setNombrePeriodo('');
            let p = new periodos_1.Periodo(startBox, endBox, nombrePeriodo);
            p.setId();
            p.setDateOfCreation();
            listPeriodos.push(p);
        }
    };
    const handleClear = () => {
        setBoxes(boxes.map(box => ({ ...box, selected: false })));
        setStartBox(null);
        setEndBox(null);
        setNombrePeriodo('');
    };
    const handleReset = () => {
        setBoxes(initialBoxes);
        setStartBox(null);
        setEndBox(null);
        setNombrePeriodo('');
        setPeriodos([]);
    };
    const createMacrociclo = async (event) => {
        event.preventDefault();
        let macrociclo = new macrociclos_1.MacroCiclo(anio, nombreMacrociclo);
        macrociclo.setId();
        macrociclo.setDateOfCreation();
        listPeriodos.forEach(p => macrociclo.agregarPeriodo(p));
        const atleta = await new persistence_1.DatabaseInterface(persistence_1.ExistingDatabase.atleta).getById(id);
        atleta.agregarMacroCiclo(macrociclo);
        new persistence_1.DatabaseInterface(persistence_1.ExistingDatabase.atleta).update(atleta);
        console.log(macrociclo.id);
        setIdm(macrociclo.id);
    };
    const handleUndo = () => {
        if (prevBoxes.length > 0) {
            setBoxes(prevBoxes.pop());
            listPeriodos.pop();
        }
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("label", null, "A\u00F1o"),
        react_1.default.createElement("input", { type: "number", minLength: 4, value: anio, onChange: e => setAnio(Number.parseInt(e.target.value)) }),
        react_1.default.createElement("label", null, "Nombre"),
        react_1.default.createElement("input", { value: nombreMacrociclo, onChange: e => setNombreMacrociclo(e.target.value) }),
        react_1.default.createElement(Grid, { boxes: boxes, handleBoxClick: handleBoxClick }),
        (startBox !== null || endBox !== null) && (react_1.default.createElement("div", { className: "form-container" },
            react_1.default.createElement("form", { onSubmit: handleSubmit },
                react_1.default.createElement("label", null,
                    "Nombre:",
                    react_1.default.createElement("input", { type: "text", value: nombrePeriodo, onChange: e => setNombrePeriodo(e.target.value) })),
                react_1.default.createElement("input", { type: "submit", value: "Submit", disabled: startBox === null || endBox === null, onSubmit: handleSubmit })),
            react_1.default.createElement("button", { type: "button", onClick: handleClear }, "Clear"),
            startBox !== null && react_1.default.createElement("div", null,
                "Comienzo: ",
                startBox),
            endBox !== null && react_1.default.createElement("div", null,
                "Fin: ",
                endBox))),
        react_1.default.createElement("button", { type: "button", onClick: handleReset }, "Reset"),
        react_1.default.createElement("button", { type: "button", onClick: (event) => {
                createMacrociclo(event);
                navigate('/macrociclo/' + idm);
            } }, "Confirmar"),
        react_1.default.createElement("button", { type: "button", onClick: handleUndo, disabled: prevBoxes.length === 0 }, "Deshacer"),
        listPeriodos.map((p) => react_1.default.createElement("ul", null,
            react_1.default.createElement("li", null,
                "Periodo: ",
                p.getNombre(),
                " "),
            react_1.default.createElement("li", null,
                "Semana Comienzo : ",
                p.getSemanaComienzo(),
                " "),
            react_1.default.createElement("li", null,
                "Semana Fin: ",
                p.getSemanaFin(),
                " ")))));
};
exports.MacroCicloCrear = MacroCicloCrear;
function Grid(props) {
    return (react_1.default.createElement("div", { className: "grid" }, props.boxes.map(box => react_1.default.createElement("div", { key: box.id, className: `box ${box.selected ? 'selected' : box.submitted ? 'submitted' : ''}`, style: box.submitted ? {
            backgroundColor: box.color
        } : {}, onClick: () => props.handleBoxClick(box.id) }, box.id))));
}
//# sourceMappingURL=CrearMacrociclo.js.map