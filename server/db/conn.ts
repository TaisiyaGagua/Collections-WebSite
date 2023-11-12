import { MongoClient, Db } from "mongodb";
require("dotenv").config({ path: "../config.env" });

const connectionString =
    "mongodb+srv://TaisiyaGagya:55470012yeS@cluster0.bunhab6.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(connectionString);

let _db: Db;
let isConnected = false;

const dbName = "web-collections";

export async function connectToServer() {
    await client.connect();
    let pingResult = await client.db(dbName).command({ ping: 1 });
    if (pingResult) {
        isConnected = true;
        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );
        _db = await client.db(dbName);
    }
}

export async function getDbObject() {
    if (!_db || !isConnected) {
        connectToServer();
    }

    return _db;
}
