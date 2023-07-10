"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const class_transformer_1 = require("class-transformer");
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const atleta_1 = require("./src/electron/model/atleta");
const knex_1 = __importDefault(require("knex"));
const AtletaRepository_1 = require("./src/electron/persistence/AtletaRepository");
const EntrenamientoRepository_1 = require("./src/electron/persistence/EntrenamientoRepository");
const AnioRepository_1 = require("./src/electron/persistence/AnioRepository");
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
    const knex = (0, knex_1.default)({
        client: 'sqlite3',
        connection: {
            filename: './data.db',
        },
        useNullAsDefault: true,
    });
    if (!(await knex.schema.hasTable('Atleta'))) {
        await knex.schema.createTable('Atleta', table => {
            table.increments('id').primary().unsigned();
            table.string('nombre');
            table.string('objetivos');
            table.string('sexo');
            table.float('altura');
            table.integer('peso');
            table.integer('anioComienzoEntrenamiento');
            table.date('fechaNacimiento');
        });
    }
    const entrenamientoRepository = new EntrenamientoRepository_1.EntrenamientoRepository(knex);
    const anioRepository = new AnioRepository_1.AnioRepository(knex);
    const atletaRepository = new AtletaRepository_1.AtletaRepository(knex, entrenamientoRepository, anioRepository);
    electron_1.ipcMain.handle('saveAtleta', async (event, atleta) => {
        return await atletaRepository.save((0, class_transformer_1.plainToInstance)(atleta_1.Atleta, atleta));
    });
    electron_1.ipcMain.handle('getAtleta', async (event, id) => await atletaRepository.get(id));
    electron_1.ipcMain.handle('getAllAtletas', async (event) => await atletaRepository.getAll());
    electron_1.ipcMain.handle('deleteAtleta', async (event, atleta) => await atletaRepository.delete(atleta));
}
//# sourceMappingURL=electron.js.map