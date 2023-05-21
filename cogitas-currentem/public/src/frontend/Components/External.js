"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = exports.MoveButton = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const MoveButton = (props) => {
    let navigate = (0, react_router_dom_1.useNavigate)();
    return (react_1.default.createElement("button", { className: "return", onClick: () => navigate(props.n) }, props.msg));
};
exports.MoveButton = MoveButton;
const Header = () => {
    return (react_1.default.createElement("div", { className: "header" },
        react_1.default.createElement("div", { className: "MoveButtons" },
            react_1.default.createElement("div", { className: "MoveButton" },
                react_1.default.createElement(exports.MoveButton, { n: -1, msg: "Volver" })),
            react_1.default.createElement("div", { className: "MoveButton" },
                react_1.default.createElement(exports.MoveButton, { n: 1, msg: "Adelante" }))),
        react_1.default.createElement("div", { className: "title" }, " Praecurre Alpha v0.1"),
        react_1.default.createElement("div", { className: "Links" },
            react_1.default.createElement(react_router_dom_1.Link, { to: './atleta', className: "Link" }, " Atletas "),
            react_1.default.createElement(react_router_dom_1.Link, { to: '/planificacion', className: "Link" }, " Planificacion "),
            react_1.default.createElement(react_router_dom_1.Link, { to: '/historial', className: "Link" }, " Historial "))));
};
exports.Header = Header;
//# sourceMappingURL=External.js.map