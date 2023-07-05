import "reflect-metadata";
import { Database, verbose } from 'sqlite3';
import { classToPlain, plainToClass, plainToInstance } from 'class-transformer'
import { BrowserWindow, ipcMain } from 'electron';
import ElectronStore from 'electron-store';
import path from 'path'
import { TableClasses, Tables } from './src/frontend/persistence/persistence';
import { Atleta } from './src/electron/model/atleta';
import { Entrenamiento } from './src/electron/model/entrenamiento';
import { Lap } from './src/electron/model/lap';
import { Resultado, TipoEntrenamiento, Sexo } from './src/electron/typeConfigs';
import { Anio, Grupo } from "./src/electron/model/anio";
import { DataSource, ObjectLiteral, createConnection } from "typeorm";
import { Persistable } from "./src/frontend/persistence/persistable";
import { MicroCiclo } from "./src/electron/model/microciclo";

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

    const connection = await new DataSource({
        type: "sqlite",
        database: ":memory:",
        entities: [Atleta,Anio,MicroCiclo,Grupo,Entrenamiento,Lap],
        synchronize: true,
    }).initialize();


    ipcMain.handle('getObjectList', async (event, tableName: Tables) => {
        const results = await connection.getRepository(TableClasses[tableName]).find()
        return results;
    });

    ipcMain.handle('setObjectList', async (event, objectList : ObjectLiteral[], tableName: Tables) => {
        const repository = connection.getRepository(TableClasses[tableName]);
        repository.clear()
        const objects = objectList.map(o => plainToInstance(TableClasses[tableName],o))
        for (const element of objects) {
            await repository.insert(element);
        }

    });

}
