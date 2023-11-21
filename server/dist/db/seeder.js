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
const faker_1 = require("@faker-js/faker");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config({ path: "../.env" });
const mongoURI = process.env.ATLAS_URI;
function seedDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = new MongoClient(mongoURI, { useUnifiedTopology: true });
            yield client.connect();
            const db = client.db("web-collections");
            const collectionNames = [
                "collection_items",
                "collections_configs",
                "user_collections",
                "user_role",
            ];
            for (const collectionName of collectionNames) {
                yield db.createCollection(collectionName);
                console.log(`Коллекция "${collectionName}" успешно создана`);
            }
            const usersToInsert = [];
            for (let i = 0; i < 10; i++) {
                const username = faker_1.faker.internet.userName();
                const email = faker_1.faker.internet.email();
                const password = faker_1.faker.internet.password();
                usersToInsert.push({ username, email, password });
            }
            usersToInsert.push({
                username: "Taya",
                email: "Taya@mail.ru",
                password: "123",
            });
            const userResult = yield db
                .collection("users")
                .insertMany(usersToInsert);
            const rolesToInsert = [{ name: "user" }, { name: "admin" }];
            yield db.collection("roles").insertMany(rolesToInsert);
            const userRole = yield db.collection("roles").findOne({ name: "user" });
            const adminRole = yield db
                .collection("roles")
                .findOne({ name: "admin" });
            const tayaUser = yield db
                .collection("users")
                .findOne({ username: "Taya" });
            const users = yield db
                .collection("users")
                .find({ username: { $ne: "Taya" } })
                .toArray();
            const userRolePairs = users.map((user) => ({
                user_id: user._id,
                role_id: userRole._id,
            }));
            const tayaUserRolePair = {
                user_id: tayaUser._id,
                role_id: adminRole._id,
            };
            yield db
                .collection("user_role")
                .insertMany([...userRolePairs, tayaUserRolePair]);
            console.log("Данные успешно добавлены в базу данных");
            client.close();
        }
        catch (error) {
            console.error("Ошибка при добавлении данных:", error);
        }
    });
}
seedDatabase();
//# sourceMappingURL=seeder.js.map