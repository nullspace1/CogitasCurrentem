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
exports.UnitSelector = void 0;
const react_1 = __importStar(require("react"));
const UnitSelector = ({ value, converter }) => {
    const [selectedUnit, setSelectedUnit] = (0, react_1.useState)(converter.default());
    return (react_1.default.createElement("div", null,
        converter.convert(value, selectedUnit),
        react_1.default.createElement("select", { value: selectedUnit, onChange: (e) => setSelectedUnit(e.target.value) }, converter.getList().map((unit) => (react_1.default.createElement("option", { value: unit, key: unit }, unit))))));
};
exports.UnitSelector = UnitSelector;
//# sourceMappingURL=UnitSelector.js.map