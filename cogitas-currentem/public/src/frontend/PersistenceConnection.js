"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnection = void 0;
const class_transformer_1 = require("class-transformer");
const atleta_1 = require("../electron/model/atleta");
class DatabaseConnection {
    async saveAtleta(atleta) {
        const at = await window.electron.saveAtleta(atleta);
        return at;
    }
    async getAllAtletas() {
        const list = await window.electron.getAllAtletas();
        list.forEach(a => (0, class_transformer_1.plainToInstance)(atleta_1.Atleta, a));
        return list;
    }
    async deleteAtleta(atleta) {
        return await window.electron.deleteAtleta(atleta);
    }
    async getAtleta(id) {
        const atleta = await window.electron.getAtleta(id);
        console.log(atleta);
        return (0, class_transformer_1.plainToInstance)(atleta_1.Atleta, atleta);
    }
}
exports.DatabaseConnection = DatabaseConnection;
//# sourceMappingURL=PersistenceConnection.js.map