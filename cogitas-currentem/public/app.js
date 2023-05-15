"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const electron_2 = __importDefault(require("./electron"));
electron_2.default.main(electron_1.app, electron_1.BrowserWindow);
//# sourceMappingURL=app.js.map