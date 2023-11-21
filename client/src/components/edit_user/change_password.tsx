import React, { useState } from "react";
import { CheckUserDto } from "../../dtos/requests/check_user_dto";
import { checkUserAsync, updateUserAsync } from "../../services/api_client";

const ChangePassword: React.FC = () => {
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    let userEmail = localStorage.getItem("email");

    let userId = localStorage.getItem("userId");

    const checkOldPassword = async (
        email: string | null,
        password: string
    ): Promise<boolean> => {
        try {
            const payload = { email, password } as CheckUserDto;
            const response = await checkUserAsync(payload);
            return response.data?.success || false;
        } catch (error) {
            console.error("Error checking old password:", error);
            return false;
        }
    };

    const handleChangePassword = async () => {
        if (userEmail && userId) {
            const isOldPasswordCorrect = await checkOldPassword(
                userEmail,
                oldPassword
            );

            if (isOldPasswordCorrect) {
                await updateUserAsync(userId, { password: newPassword });
                setNewPassword("");
                setOldPassword("");
                window.alert("Your password successful update");
            } else {
                window.alert("Old password is incorrect");
                setNewPassword("");
                setOldPassword("");
            }
        }
    };

    return (
        <div className="input-group">
            <input
                className="form-control"
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
                className="form-control"
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
                className="btn btn-outline-primary"
                onClick={handleChangePassword}
            >
                Change Password
            </button>
        </div>
    );
};

export default ChangePassword;
