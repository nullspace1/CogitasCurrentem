"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseInterface = exports.TableClasses = exports.Tables = void 0;
const class_transformer_1 = require("class-transformer");
const atleta_1 = require("../../electron/model/atleta");
const entrenamiento_1 = require("../../electron/model/entrenamiento");
const anio_1 = require("../../electron/model/anio");
var Tables;
(function (Tables) {
    Tables[Tables["atleta"] = 0] = "atleta";
    Tables[Tables["entrenamientos"] = 1] = "entrenamientos";
    Tables[Tables["macrociclo"] = 2] = "macrociclo";
})(Tables = exports.Tables || (exports.Tables = {}));
exports.TableClasses = {
    'atleta': atleta_1.Atleta,
    'entrenamientos': entrenamiento_1.Entrenamiento,
    'macrociclo': anio_1.Anio
};
class DatabaseInterface {
    databaseName;
    constructor(databaseName) {
        this.databaseName = Tables[databaseName].toString();
    }
    async getAll() {
        const objects = await window.electron.getObjectList(this.databaseName);
        return objects.map(o => (0, class_transformer_1.plainToClass)(exports.TableClasses[this.databaseName], o));
    }
    async setObjects(objects) {
        let objs = objects.map(object => (0, class_transformer_1.instanceToPlain)(object));
        window.electron.setObjectList(objs, this.databaseName);
    }
    async add(object) {
        const objects = await this.getAll();
        objects.push(object);
        this.setObjects(objects);
    }
    async replace(old, replacement) {
        const objects = await this.getAll();
        var filteredObjects = objects.filter(a => a.id !== old.id);
        replacement.id = old.id;
        filteredObjects.push(replacement);
        await this.setObjects(filteredObjects);
    }
    async delete(object) {
        const originalObjects = await this.getAll();
        var filteredObjects = originalObjects.filter(a => a.id !== object.id);
        await this.setObjects(filteredObjects);
        return filteredObjects;
    }
    async getById(id) {
        const objects = await this.getAll();
        return objects.filter(o => o.id === id)[0];
    }
    async update(object) {
        let list = await this.getAll();
        let newlist = list.filter(o => o.id !== object.id);
        newlist.push(object);
        this.setObjects(newlist);
    }
}
exports.DatabaseInterface = DatabaseInterface;
//# sourceMappingURL=persistence.js.map