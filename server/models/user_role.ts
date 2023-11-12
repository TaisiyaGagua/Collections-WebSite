import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

export interface UserRole extends mongoose.Document {
    user_id: ObjectId;
    role_id: ObjectId;
    versionKey: boolean;
}

const userRoleSchema = new Schema<UserRole>(
    {
        user_id: {
            type: ObjectId,
            required: true,
        },
        role_id: {
            type: ObjectId,
            required: true,
        },
    },
    {
        versionKey: false,
    }
);

const UserRoleSchema = mongoose.model<UserRole>("user_roles", userRoleSchema);

export default UserRoleSchema;
