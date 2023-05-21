import { BrowserWindow, ipcMain } from 'electron';
import ElectronStore from 'electron-store';
import path from 'path'
import { AppSchemas, schemas } from './src/electron/persistence/db';
import { AtletaDB, AtletaSchema } from './src/electron/persistence/atleta_schema';

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

        const store = new ElectronStore<{atletas: any}>({
            schema: AtletaSchema,
        });

        store.set('atletas',[])

        ipcMain.handle('get-atletas', (event, arg) => {
            return store.get('atletas')
        })

        ipcMain.handle('set-atletas', (event,arg) => {
            store.set('atletas',arg)
        } )
    }
}
