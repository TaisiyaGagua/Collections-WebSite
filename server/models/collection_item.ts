import { ObjectId } from "mongodb";
import mongoose, { Schema, Document } from "mongoose";
import { ItemDTO } from "../dtos/item/item_dto";

export interface ICollectionItem extends Document {
    collection_id: ObjectId;
    items: ItemDTO[];
}

const collectionItemSchema = new Schema<ICollectionItem>(
    {
        items: {
            type: [],
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

const CollectionItemModel = mongoose.model<ICollectionItem>(
    "collection_items",
    collectionItemSchema
);

export default CollectionItemModel;
