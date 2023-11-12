"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_1 = __importDefault(require("../../models/user"));
const base_repository_1 = require("../base_repository");
class UserRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(user_1.default);
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user_repository.js.map