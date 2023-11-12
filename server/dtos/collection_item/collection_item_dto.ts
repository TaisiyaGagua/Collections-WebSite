import { ObjectId } from "mongodb";
import { BaseDto } from "../base_dto";
import { ItemDTO } from "../item/item_dto";

export type CollectionItemDto = BaseDto & {
    collection_id: ObjectId;
    items: ItemDTO[];
};
