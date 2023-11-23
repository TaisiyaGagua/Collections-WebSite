import { ObjectId } from "mongodb";

export type ItemDTO = {
    name: string;
    item_id: ObjectId;
    createdAt: Date; 
    [key: string]: any;
};
