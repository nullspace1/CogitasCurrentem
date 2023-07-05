"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const class_transformer_1 = require("class-transformer");
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const persistence_1 = require("./src/frontend/persistence/persistence");
const atleta_1 = require("./src/electron/model/atleta");
const entrenamiento_1 = require("./src/electron/model/entrenamiento");
const lap_1 = require("./src/electron/model/lap");
const anio_1 = require("./src/electron/model/anio");
const typeorm_1 = require("typeorm");
const microciclo_1 = require("./src/electron/model/microciclo");
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
async function setStorageHandlers() {
    const connection = await new typeorm_1.DataSource({
        type: "sqlite",
        database: ":memory:",
        entities: [atleta_1.Atleta, anio_1.Anio, microciclo_1.MicroCiclo, anio_1.Grupo, entrenamiento_1.Entrenamiento, lap_1.Lap],
        synchronize: true,
    }).initialize();
    electron_1.ipcMain.handle('getObjectList', async (event, tableName) => {
        const results = await connection.getRepository(persistence_1.TableClasses[tableName]).find();
        return results;
    });
    electron_1.ipcMain.handle('setObjectList', async (event, objectList, tableName) => {
        const repository = connection.getRepository(persistence_1.TableClasses[tableName]);
        repository.clear();
        const objects = objectList.map(o => (0, class_transformer_1.plainToInstance)(persistence_1.TableClasses[tableName], o));
        for (const element of objects) {
            await repository.insert(element);
        }
    });
}
//# sourceMappingURL=electron.js.map