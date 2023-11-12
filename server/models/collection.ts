import mongoose, { Schema } from "mongoose";

export interface ICollection extends mongoose.Document {
    name: string;
    config: string;
    description: string;
    versionKey: boolean;
}

const collectionSchema = new Schema<ICollection>(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        config: {
            type: String,
            required: true,
        },
    },
    {
        versionKey: false,
    }
);

const CollectionSchema = mongoose.model<ICollection>(
    "collections_configs",
    collectionSchema
);

export default CollectionSchema;
