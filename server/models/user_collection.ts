import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

export interface UserCollection extends mongoose.Document {
    user_id: ObjectId;
    collection_id: ObjectId;
}

const userCollectionSchema = new Schema<UserCollection>(
    {
        user_id: {
            type: ObjectId,
            required: true,
        },
        collection_id: {
            type: ObjectId,
            required: true,
        },
    },
    {
        versionKey: false,
    }
);

const UserCollectionSchema = mongoose.model<UserCollection>(
    "user_collections",
    userCollectionSchema
);

export default UserCollectionSchema;
