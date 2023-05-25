"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Persistable = void 0;
class Persistable {
    id;
    creationDate;
    setDateOfCreation() {
        this.creationDate = new Date();
    }
    setId() {
        this.id = Math.random().toString(16).slice(2);
    }
    asObject() {
        const object = this.toObject();
        object.id = this.id;
        object.creationDate = this.creationDate.toDateString();
        return object;
    }
}
exports.Persistable = Persistable;
//# sourceMappingURL=persistable.js.map