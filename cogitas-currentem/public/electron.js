"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const electron_store_1 = __importDefault(require("electron-store"));
const path_1 = __importDefault(require("path"));
const atleta_schema_1 = require("./src/frontend/persistence/atleta_schema");
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
        setStorageHandlers();
    }
}
exports.default = Main;
function setStorageHandlers() {
    const stores = {
        'atleta': new electron_store_1.default({ schema: atleta_schema_1.AtletaSchema, })
    };
    stores['atleta'].set('atleta', []);
    electron_1.ipcMain.handle('getObjectList', (event, storeName) => {
        const usedStore = stores[storeName];
        var x = usedStore.get(storeName);
        console.log(x);
        return x;
    });
    electron_1.ipcMain.handle('setObjectList', (event, ...args) => {
        const [objectList, storeName] = args;
        const usedStore = stores[storeName];
        usedStore.set(objectList);
    });
}
//# sourceMappingURL=electron.js.map