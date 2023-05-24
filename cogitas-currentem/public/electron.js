"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const electron_store_1 = __importDefault(require("electron-store"));
const path_1 = __importDefault(require("path"));
const atleta_schema_1 = require("./src/frontend/persistence/atleta_schema");
const atleta_1 = require("./src/electron/model/atleta");
const entrenamiento_1 = require("./src/electron/model/entrenamiento");
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
        Main.mainWindow = new Main.BrowserWindow({ width: 800, height: 600, webPreferences: {
                nodeIntegration: true,
                contextIsolation: true,
                enableRemoteModule: true,
                preload: path_1.default.join(__dirname, 'preload.js')
            } });
        Main.mainWindow
            .loadURL('http://localhost:3000/');
        Main.mainWindow.on('closed', Main.onClose);
    }
    static main(app, browserWindow) {
        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('ready', Main.onReady);
        const store = new electron_store_1.default({
            schema: atleta_schema_1.AtletaSchema,
        });
        const atleta = new atleta_1.Atleta("Lautaro Moyano", new Date("2002/01/08"), 63, 174, atleta_1.Sexo.Hombre, 1, "Correr");
        const lap = new entrenamiento_1.Lap(20 * 60, 5);
        const entrenamiento = new entrenamiento_1.Entrenamiento("Sin dolor", entrenamiento_1.Resultado.Realizado, [lap], entrenamiento_1.TipoEntrenamiento.SubAerobico, new Date());
        atleta.agregarEntrenamiento(entrenamiento);
        atleta.setFechaCreacion(new Date());
        store.set('atletas', [atleta.toObject()]);
        electron_1.ipcMain.handle('get-atletas', (event, arg) => {
            return store.get('atletas');
        });
        electron_1.ipcMain.handle('set-atletas', (event, arg) => {
            store.set('atletas', arg);
        });
    }
}
exports.default = Main;
//# sourceMappingURL=electron.js.map