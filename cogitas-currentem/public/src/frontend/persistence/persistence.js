"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseInterface = exports.TableClasses = exports.Tables = void 0;
const class_transformer_1 = require("class-transformer");
const atleta_1 = require("../../electron/model/atleta");
const entrenamiento_1 = require("../../electron/model/entrenamiento");
const anio_1 = require("../../electron/model/anio");
const dates_1 = require("../../electron/dates");
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
const dependencies = {
    'atleta': { dateGenerator: new dates_1.DefaultDateGenerator() },
    'entrenamientos': {},
    'macrociclo': {}
};
class DatabaseInterface {
    databaseName;
    constructor(databaseName) {
        this.databaseName = databaseName;
    }
    async getAll() {
        const objects = await window.electron.getAll(Tables[this.databaseName]);
        const list = objects.map(o => (0, class_transformer_1.plainToInstance)(exports.TableClasses[Tables[this.databaseName]], o));
        list.forEach(o => o.init(dependencies[Tables[this.databaseName]]));
        return list;
    }
    async saveAll(objects) {
        objects.forEach(o => { o.init(dependencies[Tables[this.databaseName]]); this.save(o); });
    }
    async save(object) {
        const result = await window.electron.save((0, class_transformer_1.instanceToPlain)(object), Tables[this.databaseName]);
        const returnedObject = (0, class_transformer_1.plainToInstance)(exports.TableClasses[Tables[this.databaseName]], result);
        return returnedObject;
    }
    async delete(object) {
        await window.electron.delete((0, class_transformer_1.instanceToPlain)(object), Tables[this.databaseName]);
    }
    async get(id) {
        let object = await window.electron.get(id, Tables[this.databaseName]);
        let instance = (0, class_transformer_1.plainToInstance)(exports.TableClasses[Tables[this.databaseName]], object);
        instance.init(dependencies[Tables[this.databaseName]]);
        return instance;
    }
}
exports.DatabaseInterface = DatabaseInterface;
//# sourceMappingURL=persistence.js.map