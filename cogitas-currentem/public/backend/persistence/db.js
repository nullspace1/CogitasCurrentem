"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPersistence = exports.getAll = exports.persist = void 0;
const planificacion_schema_1 = require("./planificacion_schema");
const atleta_schema_1 = require("./atleta_schema");
const entrenamiento_schema_1 = require("./entrenamiento_schema");
const lap_schema_1 = require("./lap_schema");
const electron_1 = require("electron");
const ElectronStore = require("electron-store");
const schemas = {
    ...atleta_schema_1.AtletaSchema,
    ...planificacion_schema_1.MesoCicloSchema,
    ...planificacion_schema_1.MicroCicloSchema,
    ...entrenamiento_schema_1.EntrenamientoSchema,
    ...lap_schema_1.LapSchema
};
const store = new ElectronStore({
    schema: schemas,
});
function persist(schemaname, object) {
    const currentObjects = store.get(schemaname.toString(), []);
    currentObjects.push(object);
    store.set(schemaname.toString(), currentObjects);
}
exports.persist = persist;
function getAll(schemaname) {
    return store.get(schemaname.toString(), []);
}
exports.getAll = getAll;
function setPersistence() {
    electron_1.ipcMain.on('fetch-atletas', (event) => {
        const items = getAll(0 /* SchemaNames.atletas */); // Assuming getItems() function returns the list of items from the store
        event.sender.send('items-fetched', items);
    });
}
exports.setPersistence = setPersistence;
//# sourceMappingURL=db.js.map