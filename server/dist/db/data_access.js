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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectionString = "mongodb+srv://TaisiyaGagya:55470012yeS@cluster0.bunhab6.mongodb.net/?retryWrites=true&w=majority";
class DataAccess {
    constructor() { }
    static connect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongoose_1.default.connect(connectionString, {
                connectTimeoutMS: 20000,
                socketTimeoutMS: 20000,
                dbName: "web-collections",
            });
            mongoose_1.default.connection.on("connection", this.onConnected);
            mongoose_1.default.connection.on("error", this.onError);
        });
    }
    static onError(arg0, onError) {
        console.log("Error while trying to connect to mongo");
        console.log(arg0);
    }
    static onConnected(arg0, onConnected) {
        console.log("connected to mongodb");
    }
}
exports.default = DataAccess;
//# sourceMappingURL=data_access.js.map