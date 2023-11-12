import { BaseDto } from "../base_dto";

export type UserDto = BaseDto & {
    username: string;
    email: string;
    password: string;
};

export interface UpdateUserFields {
    email?: string;
    password?: string;
    username?: string;
}
