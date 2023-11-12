import { ObjectId } from "mongodb";

export type ItemDTO = {
    name: string;
    item_id: ObjectId;
    tags: string[];
    [key: string]: any;
};
