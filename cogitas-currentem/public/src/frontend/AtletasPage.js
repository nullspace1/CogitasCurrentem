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
exports.AtletaPag = exports.AtletasCrear = exports.Atletas = void 0;
const react_1 = __importStar(require("react"));
const atleta_1 = require("../electron/model/atleta");
const react_router_dom_1 = require("react-router-dom");
const atleta_schema_1 = require("../electron/persistence/atleta_schema");
const Atletas = () => {
    const [atletas, setAtletas] = (0, react_1.useState)([]);
    const [atletasFiltrados, setAtletasFiltrados] = (0, react_1.useState)([]);
    const [searchInput, setSearch] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        const getAll = async () => {
            const all = await new atleta_schema_1.AtletaDB().getAll();
            setAtletas(all);
        };
        getAll();
    }, []);
    (0, react_1.useEffect)(() => {
        setAtletasFiltrados(atletas);
    }, [atletas]);
    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
        if (e.target.value === 0)
            setAtletasFiltrados(atletas);
        else
            setAtletasFiltrados(atletas.filter(a => a.getNombre().toLowerCase().includes(e.target.value.toLowerCase())));
    };
    const borrarAtleta = async (atleta) => {
        const newAtletas = await new atleta_schema_1.AtletaDB().delete(atleta);
        setAtletas(newAtletas);
        setAtletasFiltrados(atletas);
    };
    return (react_1.default.createElement("div", { className: "Page" },
        react_1.default.createElement("h1", { className: "Title" }, " Listado de Atletas"),
        react_1.default.createElement("p", null, " Aca podes visualizar a todos los atletas cargados en el sistema."),
        react_1.default.createElement("div", { className: "ListAtletas" },
            react_1.default.createElement("div", { className: "ListAtletasHeader" },
                react_1.default.createElement("input", { placeholder: "Buscar...", type: "Text", onChange: handleSearch, value: searchInput, defaultValue: "" }),
                react_1.default.createElement(react_router_dom_1.Link, { to: "./nuevo" }, " Nuevo Atleta ")),
            react_1.default.createElement("div", { className: "ListAtletas" },
                react_1.default.createElement("ul", null, atletasFiltrados.map((a, index) => react_1.default.createElement("li", { key: index },
                    react_1.default.createElement("div", { className: "ListAtletasAtleta" }, a.getNombre()),
                    react_1.default.createElement(react_router_dom_1.Link, { className: "ListAtletasLink", to: "./" + a.getId() }, " Ver "),
                    react_1.default.createElement("button", { onClick: () => borrarAtleta(a) }, "Eliminar"))))))));
};
exports.Atletas = Atletas;
const AtletasCrear = () => {
    const [atletaData, setData] = (0, react_1.useState)({ nombre: "",
        fechaNacimiento: "",
        alturaEnCm: 0,
        sexo: atleta_1.Sexo.Hombre,
        aniosEntrenamiento: 0,
        pesoEnKilos: 0,
        objetivos: ""
    });
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const type = event.target.type;
        setData(prevData => ({ ...prevData, [name]: type === "number" ? parseInt(value, 10) : value }));
    };
    const crearAtleta = async () => {
        var atleta = new atleta_1.Atleta(atletaData.nombre, new Date(atletaData.fechaNacimiento), atletaData.pesoEnKilos, atletaData.alturaEnCm, atletaData.sexo, atletaData.aniosEntrenamiento, atletaData.objetivos);
        new atleta_schema_1.AtletaDB().add(atleta);
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Crear Atleta"),
        react_1.default.createElement("form", { className: "Formulario", onSubmit: crearAtleta },
            react_1.default.createElement("h2", null, " Datos Fisicos "),
            react_1.default.createElement("label", { htmlFor: "nombre" }, "Nombre"),
            react_1.default.createElement("input", { onChange: handleChange, type: "text", id: "nombre", name: "nombre", value: atletaData.nombre }),
            react_1.default.createElement("label", { htmlFor: "fechaNacimiento" }, " Fecha de nacimiento "),
            react_1.default.createElement("input", { onChange: handleChange, type: "date", id: "fechaNacimiento", name: "fechaNacimiento", value: atletaData.fechaNacimiento }),
            react_1.default.createElement("label", { htmlFor: "alturaEnCm" }, " Altura (en cm)"),
            react_1.default.createElement("input", { onChange: handleChange, type: "number", min: 0, id: "alturaEnCm", name: "alturaEnCm", value: atletaData.alturaEnCm }),
            react_1.default.createElement("label", { htmlFor: "sexo" }, " Sexo "),
            react_1.default.createElement("select", { onChange: handleChange, name: "sexo", value: atletaData.sexo },
                react_1.default.createElement("option", { value: atleta_1.Sexo.Hombre }, " Hombre "),
                react_1.default.createElement("option", { value: atleta_1.Sexo.Mujer }, " Mujer ")),
            react_1.default.createElement("label", { htmlFor: "pesoEnKilos" }, " Peso (en kg) "),
            react_1.default.createElement("input", { onChange: handleChange, type: "number", name: "pesoEnKilos", value: atletaData.pesoEnKilos }),
            react_1.default.createElement("h2", null, " Sobre Atletismo"),
            react_1.default.createElement("label", { htmlFor: "aniosEntrenamiento" }, "A\u00F1os de Entrenamiento"),
            react_1.default.createElement("input", { onChange: handleChange, type: "number", min: 0, name: "aniosEntrenamiento", value: atletaData.aniosEntrenamiento }),
            react_1.default.createElement("label", { htmlFor: "objetivos" }, " Objetivos "),
            react_1.default.createElement("input", { onChange: handleChange, type: "text", name: "objetivos", value: atletaData.objetivos }),
            react_1.default.createElement("button", { type: "submit" }, " Cargar "))));
};
exports.AtletasCrear = AtletasCrear;
const AtletaPag = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const [atletaInfo, setAtletaInfo] = (0, react_1.useState)(null);
    (0, react_1.useLayoutEffect)(() => {
        const fetch = async () => {
            const atletas = await new atleta_schema_1.AtletaDB().getAll();
            const atleta = atletas.filter(x => x.getId() !== id)[0];
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
        react_1.default.createElement("div", { className: "infopersonal" },
            react_1.default.createElement("h2", null, "Informacion Personal"),
            react_1.default.createElement("ul", null,
                react_1.default.createElement("li", null,
                    "Edad:   ",
                    atletaInfo.getEdad(),
                    " ")))));
};
exports.AtletaPag = AtletaPag;
//# sourceMappingURL=AtletasPage.js.map