import { faker } from "@faker-js/faker";
const MongoClient = require("mongodb").MongoClient;

require("dotenv").config({ path: "../.env" });

const mongoURI = process.env.ATLAS_URI!;

async function seedDatabase() {
    try {
        const client = new MongoClient(mongoURI, { useUnifiedTopology: true });
        await client.connect();

        const db = client.db("web-collections");

        const collectionNames = [
            "collection_items",
            "collections_configs",
            "user_collections",
            "user_role",
        ];

        for (const collectionName of collectionNames) {
            await db.createCollection(collectionName);
            console.log(`Коллекция "${collectionName}" успешно создана`);
        }

        const usersToInsert = [];
        for (let i = 0; i < 10; i++) {
            const username = faker.internet.userName();
            const email = faker.internet.email();
            const password = faker.internet.password();
            

            usersToInsert.push({ username, email, password });
        }

        usersToInsert.push({
            username: "Taya",
            email: "Taya@mail.ru",
            password: "123",
        });

        const userResult = await db
            .collection("users")
            .insertMany(usersToInsert);

        const rolesToInsert = [{ name: "user" }, { name: "admin" }];
        await db.collection("roles").insertMany(rolesToInsert);

        const userRole = await db.collection("roles").findOne({ name: "user" });
        const adminRole = await db
            .collection("roles")
            .findOne({ name: "admin" });

        const tayaUser = await db
            .collection("users")
            .findOne({ username: "Taya" });

        const users = await db
            .collection("users")
            .find({ username: { $ne: "Taya" } })
            .toArray();
        const userRolePairs = users.map((user: { _id: any }) => ({
            user_id: user._id,
            role_id: userRole._id,
        }));

        const tayaUserRolePair = {
            user_id: tayaUser._id,
            role_id: adminRole._id,
        };

        await db
            .collection("user_role")
            .insertMany([...userRolePairs, tayaUserRolePair]);

        console.log("Данные успешно добавлены в базу данных");

        client.close();
    } catch (error) {
        console.error("Ошибка при добавлении данных:", error);
    }
}

seedDatabase();
