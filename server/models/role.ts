import mongoose, { Schema } from "mongoose";

export interface Role extends mongoose.Document {
    versionKey: boolean;
    name: string;
}
const roleSchema = new Schema<Role>(
    {
        name: {
            type: String,
            required: true,
        },
    },
    {
        versionKey: false,
    }
);

const RoleSchema = mongoose.model<Role>("roles", roleSchema);

export default RoleSchema;
