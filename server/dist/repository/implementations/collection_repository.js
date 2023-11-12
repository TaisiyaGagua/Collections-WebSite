"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionRepository = void 0;
const collection_1 = __importDefault(require("../../models/collection"));
const base_repository_1 = require("../base_repository");
class CollectionRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(collection_1.default);
    }
}
exports.CollectionRepository = CollectionRepository;
//# sourceMappingURL=collection_repository.js.map