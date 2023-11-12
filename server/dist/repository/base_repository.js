"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(schemaModel) {
        this._schemaModel = schemaModel;
    }
    create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this._schemaModel.create(item);
            return result.id;
        });
    }
    deleteById(id) {
        throw new Error("Method not implemented.");
    }
    getById(item) {
        throw new Error("Method not implemented.");
    }
    updateById(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingObject = yield this._schemaModel.findById(id);
            if (!existingObject) {
                return undefined;
            }
            for (const key in updateData) {
                if (Object.prototype.hasOwnProperty.call(updateData, key)) {
                    existingObject[key] = updateData[key];
                }
            }
            const updatedObject = yield existingObject.save();
            return updatedObject;
        });
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base_repository.js.map