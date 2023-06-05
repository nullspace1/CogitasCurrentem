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
exports.Atletas = void 0;
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const persistence_1 = require("../persistence/persistence");
const Atletas = () => {
    const [atletas, setAtletas] = (0, react_1.useState)([]);
    const [atletasFiltrados, setAtletasFiltrados] = (0, react_1.useState)([]);
    const [searchInput, setSearch] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        const getAll = async () => {
            const all = await new persistence_1.DatabaseInterface(persistence_1.ExistingDatabase.atleta).getAll();
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
        const newAtletas = await new persistence_1.DatabaseInterface(persistence_1.ExistingDatabase.atleta).delete(atleta);
        setAtletas(newAtletas);
        setAtletasFiltrados(newAtletas);
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, " Listado de Atletas"),
        react_1.default.createElement("p", null, " Aca podes visualizar a todos los atletas cargados en el sistema."),
        react_1.default.createElement("div", null,
            react_1.default.createElement("div", null,
                react_1.default.createElement("input", { placeholder: "Buscar...", type: "Text", onChange: handleSearch, value: searchInput, defaultValue: "" }),
                react_1.default.createElement(react_router_dom_1.Link, { to: "./nuevo" }, " Nuevo Atleta ")),
            react_1.default.createElement("div", null,
                react_1.default.createElement("ul", null, atletasFiltrados.map((a, index) => react_1.default.createElement("li", { key: index },
                    react_1.default.createElement("div", null, a.getNombre()),
                    react_1.default.createElement(react_router_dom_1.Link, { to: "./" + a.id }, " Ver "),
                    react_1.default.createElement("button", { onClick: () => borrarAtleta(a) }, "Eliminar"))))))));
};
exports.Atletas = Atletas;
//# sourceMappingURL=MainPage.js.map