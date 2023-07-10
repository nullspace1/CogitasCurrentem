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
exports.AtletaForm = void 0;
const react_1 = __importStar(require("react"));
const atleta_1 = require("../../electron/model/atleta");
const react_router_dom_1 = require("react-router-dom");
const PersistenceConnection_1 = require("../PersistenceConnection");
function AtletaForm({ id }) {
    const [atletaData, setData] = (0, react_1.useState)({
        nombre: "",
        fechaNacimiento: "",
        altura: 0,
        sexo: atleta_1.Sexo.Hombre,
        anioComienzoEntrenamiento: 2023,
        peso: 0,
        objetivos: ""
    });
    const [atleta, setAtleta] = (0, react_1.useState)(null);
    const nav = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        const getAtleta = async () => {
            if (id != "") {
                const atleta = (await new PersistenceConnection_1.DatabaseConnection().getAtleta(parseInt(id)));
                setAtleta(atleta);
                setData({
                    nombre: atleta.nombre,
                    fechaNacimiento: atleta.fechaNacimiento.toISOString().split('T')[0],
                    altura: atleta.altura,
                    sexo: atleta.sexo,
                    anioComienzoEntrenamiento: atleta.anioComienzoEntrenamiento,
                    peso: atleta.peso,
                    objetivos: atleta.objetivos
                });
            }
        };
        getAtleta();
    }, []);
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const type = event.target.type;
        setData(prevData => ({ ...prevData, [name]: type === "number" ? parseInt(value, 10) : value }));
    };
    const crearAtleta = async () => {
        if (atleta !== null) {
            atleta.nombre = atletaData.nombre;
            atleta.fechaNacimiento = new Date(atletaData.fechaNacimiento);
            atleta.altura = atletaData.altura;
            atleta.sexo = atletaData.sexo;
            atleta.anioComienzoEntrenamiento = atletaData.anioComienzoEntrenamiento;
            atleta.peso = atletaData.peso;
            atleta.objetivos = atletaData.objetivos;
            const object = await new PersistenceConnection_1.DatabaseConnection().saveAtleta(atleta);
            const id = object.id;
            nav('/atleta/' + id);
        }
        else {
            const newAtleta = new atleta_1.Atleta(atletaData.nombre, new Date(Date.parse(atletaData.fechaNacimiento)), atletaData.peso, atletaData.altura, atletaData.sexo, atletaData.anioComienzoEntrenamiento, atletaData.objetivos);
            const object = await new PersistenceConnection_1.DatabaseConnection().saveAtleta(newAtleta);
            const id = object.id;
            nav('/atleta/' + id);
        }
    };
    return (react_1.default.createElement("form", { onSubmit: async (event) => { event.preventDefault(); await crearAtleta(); } },
        react_1.default.createElement("h2", null, " Datos Fisicos "),
        react_1.default.createElement("label", { htmlFor: "nombre" }, "Nombre"),
        react_1.default.createElement("input", { onChange: handleChange, type: "text", id: "nombre", name: "nombre", value: atletaData.nombre }),
        react_1.default.createElement("label", { htmlFor: "fechaNacimiento" }, " Fecha de nacimiento "),
        react_1.default.createElement("input", { onChange: handleChange, type: "date", id: "fechaNacimiento", name: "fechaNacimiento", value: atletaData.fechaNacimiento }),
        react_1.default.createElement("label", { htmlFor: "altura" }, " Altura (en cm)"),
        react_1.default.createElement("input", { onChange: handleChange, type: "number", min: 0, id: "altura", name: "altura", value: atletaData.altura }),
        react_1.default.createElement("label", { htmlFor: "sexo" }, " Sexo "),
        react_1.default.createElement("select", { onChange: handleChange, name: "sexo", value: atletaData.sexo },
            react_1.default.createElement("option", { value: atleta_1.Sexo.Hombre }, " Hombre "),
            react_1.default.createElement("option", { value: atleta_1.Sexo.Mujer }, " Mujer ")),
        react_1.default.createElement("label", { htmlFor: "peso" }, " Peso (en kg) "),
        react_1.default.createElement("input", { onChange: handleChange, type: "number", name: "peso", value: atletaData.peso }),
        react_1.default.createElement("h2", null, " Sobre Atletismo"),
        react_1.default.createElement("label", { htmlFor: "anioComienzoEntrenamiento" }, "A\u00F1o comienzo de entrenamiento"),
        react_1.default.createElement("input", { onChange: handleChange, type: "number", min: 1900, name: "anioComienzoEntrenamiento", value: atletaData.anioComienzoEntrenamiento }),
        react_1.default.createElement("label", { htmlFor: "objetivos" }, " Objetivos "),
        react_1.default.createElement("input", { onChange: handleChange, type: "text", name: "objetivos", value: atletaData.objetivos }),
        react_1.default.createElement("button", { type: "submit" }, " Cargar ")));
}
exports.AtletaForm = AtletaForm;
//# sourceMappingURL=AtletaForm.js.map