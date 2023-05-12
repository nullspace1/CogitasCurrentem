"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mayorPace = void 0;
const conversionAMetro = {
    metro: 1,
    kilometro: 1000,
    milla: 1609.36
};
const conversionASegundo = {
    minuto: 60,
    hora: 3600
};
function mayorPace(x, y) {
    return x < y ? x : y;
}
exports.mayorPace = mayorPace;
//# sourceMappingURL=utils.js.map