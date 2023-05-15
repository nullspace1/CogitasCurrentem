"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Home = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Home = () => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Praecurre v0.1 Pre-Alpha"),
        react_1.default.createElement("div", { className: 'Links' },
            react_1.default.createElement("div", { className: 'Link' },
                " ",
                react_1.default.createElement(react_router_dom_1.Link, { to: './atletas' }, " Atletas "),
                " "),
            react_1.default.createElement("div", { className: 'Link' },
                " ",
                react_1.default.createElement(react_router_dom_1.Link, { to: '/planificacion' }, " Planificacion ")),
            react_1.default.createElement("div", { className: 'Link' },
                " ",
                react_1.default.createElement(react_router_dom_1.Link, { to: '/historial' }, " Historial "),
                " "))));
};
exports.Home = Home;
//# sourceMappingURL=Home.js.map