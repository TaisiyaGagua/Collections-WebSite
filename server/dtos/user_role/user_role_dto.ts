import { ObjectId } from "mongodb";
import { BaseDto } from "../base_dto";

export type UserRoleDto = BaseDto & {
    user_id: ObjectId;
    role_id: ObjectId;
};
