import mongoose from "mongoose";

class DataAccess {
    constructor() {}

    static async connect(connectionString: string) {
        await mongoose.connect(connectionString, {
            connectTimeoutMS: 20000,
            socketTimeoutMS: 20000,
            dbName: "web-collections",
        });

        mongoose.connection.on("connection", this.onConnected);
        mongoose.connection.on("error", this.onError);
    }
    static onError(arg0: string, onError: any) {
        console.log("Error while trying to connect to mongo");
        console.log(arg0);
    }

    static onConnected(arg0: string, onConnected: any) {
        console.log("connected to mongodb");
    }
}

export default DataAccess;
