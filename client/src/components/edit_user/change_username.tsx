import React, { useState } from "react";
import { updateUserAsync } from "../../services/api_client";
import { UserDetails } from "../../dtos/user_settings";

const ChangeUsername: React.FC = () => {
    let userId = localStorage.getItem("userId");
    const [newUsername, setNewUsername] = useState<string>("");
    const [userDetails, setUserDetails] = useState<UserDetails>({
        username: localStorage.getItem("username"),
        email: localStorage.getItem("email"),
    });

    const handleChangeUsername = async () => {
        if (userId) {
            await updateUserAsync(userId, { username: newUsername });
            localStorage.setItem("username", newUsername);
        }
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            username: newUsername,
        }));
        setNewUsername("");
    };

    return (
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
    );
};

export default ChangeUsername;
