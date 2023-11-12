"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionItemRepository = void 0;
const collection_item_1 = __importDefault(require("../../models/collection_item"));
const base_repository_1 = require("../base_repository");
class CollectionItemRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(collection_item_1.default);
    }
}
exports.CollectionItemRepository = CollectionItemRepository;
//# sourceMappingURL=collection_item_repository.js.map