"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAtleta = exports.e = void 0;
require("reflect-metadata");
const electron_1 = require("electron");
const electron_store_1 = __importDefault(require("electron-store"));
const path_1 = __importDefault(require("path"));
const atleta_1 = require("./src/electron/model/atleta");
const entrenamiento_1 = require("./src/electron/model/entrenamiento");
const lap_1 = require("./src/electron/model/lap");
const typeConfigs_1 = require("./src/electron/typeConfigs");
function e(list, week) {
    const laps = [];
    for (const [a, b] of list) {
        laps.push(new lap_1.Lap(a, b));
    }
    return new entrenamiento_1.Entrenamiento('Ent', typeConfigs_1.Resultado.Normal, laps, typeConfigs_1.TipoEntrenamiento.SUBMAX, week, 1);
}
exports.e = e;
function getAtleta(fechaNacimiento, aniosEntrenamiento, entrenamiento, carrera, test) {
    let z = new atleta_1.Atleta("Lautaro", fechaNacimiento, 62, 170, typeConfigs_1.Sexo.Hombre, aniosEntrenamiento, "");
    z.agregarEntrenamiento(entrenamiento);
    z.agregarCarrera(carrera);
    z.agregarTest(test);
    z.setDateOfCreation();
    z.setId();
    return z;
}
exports.getAtleta = getAtleta;
class Main {
    static mainWindow;
    static application;
    static BrowserWindow;
    static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            Main.application.quit();
        }
    }
    static onClose() {
        // Dereference the window object.
        Main.mainWindow = null;
    }
    static onReady() {
        Main.mainWindow = new Main.BrowserWindow({
            width: 800, height: 600, webPreferences: {
                nodeIntegration: true,
                contextIsolation: true,
                enableRemoteModule: true,
                preload: path_1.default.join(__dirname, 'preload.js')
            }
        });
        Main.mainWindow
            .loadURL('http://localhost:3000/');
        Main.mainWindow.on('closed', Main.onClose);
    }
    static main(app, browserWindow) {
        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('ready', Main.onReady);
        setStorageHandlers();
    }
}
exports.default = Main;
function setStorageHandlers() {
    const stores = {
        'atleta': new electron_store_1.default()
    };
    let atleta = getAtleta(Date.parse("2000/01/01"), 3, e([[110, 400]], 1), e([[115, 400]], 3), e([[113, 400]], 1));
    stores['atleta'].set('atleta', [atleta]);
    electron_1.ipcMain.handle('getObjectList', (event, storeName) => {
        const usedStore = stores[storeName];
        var x = usedStore.get(storeName);
        console.log(x);
        return x;
    });
    electron_1.ipcMain.handle('setObjectList', (event, ...args) => {
        const [objectList, storeName] = args;
        const usedStore = stores[storeName];
        usedStore.set(storeName, objectList);
    });
}
//# sourceMappingURL=electron.js.map