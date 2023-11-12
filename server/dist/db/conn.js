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
exports.getDbObject = exports.connectToServer = void 0;
const mongodb_1 = require("mongodb");
require("dotenv").config({ path: "../config.env" });
const connectionString = "mongodb+srv://TaisiyaGagya:55470012yeS@cluster0.bunhab6.mongodb.net/?retryWrites=true&w=majority";
const client = new mongodb_1.MongoClient(connectionString);
let _db;
let isConnected = false;
const dbName = "web-collections";
function connectToServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        let pingResult = yield client.db(dbName).command({ ping: 1 });
        if (pingResult) {
            isConnected = true;
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
            _db = yield client.db(dbName);
        }
    });
}
exports.connectToServer = connectToServer;
function getDbObject() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!_db || !isConnected) {
            connectToServer();
        }
        return _db;
    });
}
exports.getDbObject = getDbObject;
//# sourceMappingURL=conn.js.map