import "reflect-metadata";
import { Database, verbose } from 'sqlite3';
import {  instanceToPlain,  plainToInstance } from 'class-transformer'
import { BrowserWindow, ipcMain } from 'electron';
import path from 'path'
import { Atleta } from './src/electron/model/atleta';
import { Entrenamiento } from './src/electron/model/entrenamiento';
import { Lap } from './src/electron/model/lap';
import { Anio, Grupo } from "./src/electron/model/anio";
import { MicroCiclo } from "./src/electron/model/microciclo";
import Knex from 'knex';
import { AtletaRepository } from "./src/electron/persistence/AtletaRepository";
import { EntrenamientoRepository } from "./src/electron/persistence/EntrenamientoRepository";
import { AnioRepository } from "./src/electron/persistence/AnioRepository";

export default class Main {
    static mainWindow: Electron.BrowserWindow;
    static application: Electron.App;
    static BrowserWindow;

    private static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            Main.application.quit();
        }
    }

    private static onClose() {
        // Dereference the window object.
        Main.mainWindow = null;
    }

    private static onReady() {
        Main.mainWindow = new Main.BrowserWindow({
            width: 800, height: 600, webPreferences: {
                nodeIntegration: true,
                contextIsolation: true,
                enableRemoteModule: true,
                preload: path.join(__dirname, 'preload.js')
            }
        });
        Main.mainWindow
            .loadURL('http://localhost:3000/');
        Main.mainWindow.on('closed', Main.onClose);
    }

    static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('ready', Main.onReady);
        setStorageHandlers()
    }
}

async function setStorageHandlers() {

    const knex = Knex({
        client: 'sqlite3',
        connection: {
        filename: './data.db',
        },
     useNullAsDefault: true,
    })

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


    const entrenamientoRepository = new EntrenamientoRepository(knex)
    const anioRepository = new AnioRepository(knex)
    const atletaRepository = new AtletaRepository(knex,entrenamientoRepository,anioRepository)

    ipcMain.handle('saveAtleta', async (event,atleta) => {
        return await atletaRepository.save(plainToInstance(Atleta,atleta))
    })
    ipcMain.handle('getAtleta', async (event,id) => await atletaRepository.get(id))
    ipcMain.handle('getAllAtletas', async (event) => await atletaRepository.getAll())
    ipcMain.handle('deleteAtleta', async (event,atleta) => await atletaRepository.delete(atleta))

}
