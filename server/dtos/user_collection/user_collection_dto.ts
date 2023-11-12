import { ObjectId } from "mongodb";
import { BaseDto } from "../base_dto";

export type UserCollectionDto = BaseDto & {
    user_id: ObjectId;
    collection_id: ObjectId;
};
