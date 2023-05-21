"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const AtletasPage_1 = require("./frontend/AtletasPage");
const HistorialPage_1 = require("./frontend/HistorialPage");
const PlanificacionPage_1 = require("./frontend/PlanificacionPage");
const Home_1 = require("./frontend/Home");
const External_1 = require("./frontend/Components/External");
const App = () => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(External_1.Header, null),
        react_1.default.createElement(react_router_dom_1.Routes, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: '/', Component: Home_1.Home }),
            react_1.default.createElement(react_router_dom_1.Route, { path: '/atleta', Component: AtletasPage_1.Atletas }),
            react_1.default.createElement(react_router_dom_1.Route, { path: '/planificacion', Component: PlanificacionPage_1.Planificacion }),
            react_1.default.createElement(react_router_dom_1.Route, { path: '/historial', Component: HistorialPage_1.Historial }),
            react_1.default.createElement(react_router_dom_1.Route, { path: '/atleta/nuevo', Component: AtletasPage_1.AtletasCrear }),
            react_1.default.createElement(react_router_dom_1.Route, { path: '/atleta/:id', Component: AtletasPage_1.AtletaPag }))));
};
exports.default = App;
//# sourceMappingURL=App.js.map