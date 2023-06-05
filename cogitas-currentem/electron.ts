import "reflect-metadata";
import { BrowserWindow, ipcMain } from 'electron';
import ElectronStore from 'electron-store';
import path from 'path'
import { ExistingDatabase } from './src/frontend/persistence/persistence';
import { Atleta } from './src/electron/model/atleta';
import { Entrenamiento } from './src/electron/model/entrenamiento';
import { Lap } from './src/electron/model/lap';
import { Resultado, TipoEntrenamiento, Sexo } from './src/electron/typeConfigs';


export function e(list: number[][], week) {
    const laps: Lap[] = []
    for (const [a, b] of list) {
        laps.push(new Lap(a, b))
    }
    return new Entrenamiento('Ent', Resultado.Normal, laps, TipoEntrenamiento.SUBMAX, week, 1)
}

export function getAtleta(fechaNacimiento, aniosEntrenamiento, entrenamiento, carrera, test) {
    let z = new Atleta("Lautaro", fechaNacimiento, 62, 170, Sexo.Hombre, aniosEntrenamiento, "")
    z.agregarEntrenamiento(entrenamiento)
    z.agregarCarrera(carrera)
    z.agregarTest(test)
    z.setDateOfCreation()
    z.setId()
    return z
}


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



function setStorageHandlers() {

    const stores = {
        'atleta': new ElectronStore()
    }

    let atleta = getAtleta(Date.parse("2000/01/01"), 3, e([[110, 400]], 1), e([[115, 400]], 3), e([[113, 400]], 1))

    stores['atleta'].set('atleta', [atleta])

    ipcMain.handle('getObjectList', (event, storeName: ExistingDatabase) => {
        const usedStore = stores[storeName]
        var x = usedStore.get(storeName)
        console.log(x)
        return x
    })

    ipcMain.handle('setObjectList', (event, ...args) => {
        const [objectList, storeName] = args
        const usedStore = stores[storeName]
        usedStore.set(storeName, objectList)
    })
}
