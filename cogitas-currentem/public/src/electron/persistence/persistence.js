"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Persistable = exports.Repository = void 0;
class Persistable {
    id;
}
exports.Persistable = Persistable;
class Repository {
    knex;
    TABLE_NAME;
    constructor(knex) {
        this.knex = knex;
    }
    async save(object) {
        if (object.id === undefined) {
            const ids = await this.knex(this.TABLE_NAME).insert(this.toData(object));
            object.id = ids[0];
            return object;
        }
        else {
            await this.knex(this.TABLE_NAME).update(this.toData(object)).where('id', '=', object.id);
            return object;
        }
    }
    async get(id) {
        const data = await this.knex(this.TABLE_NAME).select("*").where('id', "=", id);
        return this.toObject(data[0]);
    }
    async getAll() {
        let atletaList = await this.knex(this.TABLE_NAME).select("*");
        return atletaList.map(a => this.toObject(a));
    }
    async delete(object) {
        await this.knex(this.TABLE_NAME).delete().where('id', '=', object.id);
    }
    toIdList(list) {
        return list.map(e => e.id);
    }
}
exports.Repository = Repository;
//# sourceMappingURL=persistence.js.map