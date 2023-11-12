import mongoose, { Schema } from "mongoose";

export interface User extends mongoose.Document {
    username: string;
    email: string;
    password: string;
    versionKey: boolean;
}

const userSchema = new Schema<User>(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    },
    {
        versionKey: false,
    }
);

const UserSchema = mongoose.model<User>("users", userSchema);

export default UserSchema;
