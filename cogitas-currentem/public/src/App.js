"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
require("./css/App.css");
const AtletasPage_1 = require("./frontend/AtletasPage");
const HistorialPage_1 = require("./frontend/HistorialPage");
const PlanificacionPage_1 = require("./frontend/PlanificacionPage");
const Home_1 = require("./frontend/Home");
// const ipcRenderer = window.require('electron').ipcRenderer;
const App = () => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(react_router_dom_1.Routes, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: '/', Component: Home_1.Home }),
            react_1.default.createElement(react_router_dom_1.Route, { path: '/atletas', Component: AtletasPage_1.Atletas }),
            react_1.default.createElement(react_router_dom_1.Route, { path: '/planificacion', Component: PlanificacionPage_1.Planificacion }),
            react_1.default.createElement(react_router_dom_1.Route, { path: '/historial', Component: HistorialPage_1.Historial }))));
};
exports.default = App;
//# sourceMappingURL=App.js.map