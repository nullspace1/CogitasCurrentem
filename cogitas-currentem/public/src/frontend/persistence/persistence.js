"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseInterface = exports.ExistingDatabase = void 0;
const atleta_1 = require("../../electron/model/atleta");
const entrenamiento_1 = require("../../electron/model/entrenamiento");
var ExistingDatabase;
(function (ExistingDatabase) {
    ExistingDatabase[ExistingDatabase["atleta"] = 0] = "atleta";
    ExistingDatabase[ExistingDatabase["entrenamientos"] = 1] = "entrenamientos";
})(ExistingDatabase = exports.ExistingDatabase || (exports.ExistingDatabase = {}));
const converters = {
    'atleta': (atleta_1.Atleta.fromObject),
    'entrenamientos': (entrenamiento_1.Entrenamiento.fromObject)
};
class DatabaseInterface {
    databaseName;
    constructor(databaseName) {
        this.databaseName = ExistingDatabase[databaseName].toString();
    }
    async getAll() {
        const objects = await window.electron.getObjectList(this.databaseName);
        return objects.map(o => converters[this.databaseName](o));
    }
    async setObjects(objects) {
        window.electron.setObjectList(objects.map(object => object.asObject()), this.databaseName);
    }
    async add(object) {
        const objects = await this.getAll();
        object.setDateOfCreation();
        object.setId();
        objects.push(object);
        this.setObjects(objects);
    }
    async delete(object) {
        const originalObjects = await this.getAll();
        var filteredObjects = originalObjects.filter(a => a.id !== object.id);
        await this.setObjects(filteredObjects);
        return filteredObjects;
    }
}
exports.DatabaseInterface = DatabaseInterface;
//# sourceMappingURL=persistence.js.map