import React, { useState } from "react";
import {
    updateUserAsync,
    deleteUserAsync,
    checkUserAsync,
} from "../services/api_client";
import { CheckUserDto } from "../dtos/requests/check_user_dto";
import BackToAuthorisedBtn from "./buttons/back_to_authorised_btn";

interface UserDetails {
    username: string | null;
    email: string | null;
}

const AccountSettings: React.FC = () => {
    const [userDetails, setUserDetails] = useState<UserDetails>({
        username: localStorage.getItem("username"),
        email: localStorage.getItem("email"),
    });
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newUsername, setNewUsername] = useState<string>("");
    const [newEmail, setNewEmail] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] =
        useState<boolean>(false);

    let userId = localStorage.getItem("userId");

    const handleChangeUsername = async () => {
        await updateUserAsync(userId, { username: newUsername });
        setIsSuccess(true);
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            username: newUsername,
        }));
        localStorage.setItem("username", newUsername);
    };

    const handleChangeEmail = async () => {
        await updateUserAsync(userId, { email: newEmail });
        setIsSuccess(true);
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            email: newEmail,
        }));
        localStorage.setItem("email", newEmail);
    };
    const checkOldPassword = async (
        email: string,
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
        if (userDetails.email) {
            const isOldPasswordCorrect = await checkOldPassword(
                userDetails.email,
                oldPassword
            );

            if (isOldPasswordCorrect) {
                await updateUserAsync(userId, { password: newPassword });
                setIsSuccess(true);
            } else {
                window.alert("Old password is incorrect");
            }
        }
    };
    const handleDeleteAccount = async () => {
        await deleteUserAsync(userId);
        localStorage.clear();

        window.location.href = "/";
    };

    return (
        <div>
            <h2>Account Settings</h2>
            <div>
                <p>Username: {userDetails.username}</p>
                <div className="input-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="New Username"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
                    <button
                        className="btn btn-outline-primary"
                        onClick={handleChangeUsername}
                    >
                        Change Username
                    </button>
                </div>
            </div>

            <div>
                <p>Email: {userDetails.email}</p>
                <div className="input-group ">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="New Email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                    />
                    <button
                        className="btn btn-outline-primary"
                        onClick={handleChangeEmail}
                    >
                        Change Email
                    </button>
                </div>
            </div>
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

            <div>
                <button
                    className="btn btn-danger"
                    onClick={() => setShowDeleteConfirmation(true)}
                >
                    Delete Account
                </button>
                {showDeleteConfirmation && (
                    <div>
                        <p>Are you sure you want to delete your account?</p>
                        <button
                            className="btn btn-outline-danger"
                            onClick={handleDeleteAccount}
                        >
                            Yes
                        </button>
                        <button
                            className="btn btn-outline-info"
                            onClick={() => setShowDeleteConfirmation(false)}
                        >
                            No
                        </button>
                    </div>
                )}
            </div>

            {isSuccess && <p>Changes were successful!</p>}

            <BackToAuthorisedBtn />
        </div>
    );
};

export default AccountSettings;
