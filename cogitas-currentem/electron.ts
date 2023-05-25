import { BrowserWindow, ipcMain } from 'electron';
import ElectronStore from 'electron-store';
import path from 'path'
import {  AtletaSchema } from './src/frontend/persistence/atleta_schema';
import { ExistingDatabase } from './src/frontend/persistence/persistence';

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
        Main.mainWindow = new Main.BrowserWindow({ width: 800, height: 600 , webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            enableRemoteModule: true,
            preload: path.join(__dirname, 'preload.js')
          }});
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



function setStorageHandlers(){

    const stores = {
        'atleta' : new ElectronStore<{atleta: any}>({schema: AtletaSchema,})
    }

    stores['atleta'].set('atleta',[])

    ipcMain.handle('getObjectList', (event, storeName : ExistingDatabase) => {
        const usedStore = stores[storeName]
        var x = usedStore.get(storeName)
        return x
    })

    ipcMain.handle('setObjectList', (event,...args) => {
        const [objectList, storeName] = args
        const usedStore = stores[storeName]
        usedStore.set(objectList)
    } )
}
