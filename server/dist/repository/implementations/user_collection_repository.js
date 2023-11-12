"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCollectionRepository = void 0;
const user_collection_1 = __importDefault(require("../../models/user_collection"));
const base_repository_1 = require("../base_repository");
class UserCollectionRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(user_collection_1.default);
    }
}
exports.UserCollectionRepository = UserCollectionRepository;
//# sourceMappingURL=user_collection_repository.js.map