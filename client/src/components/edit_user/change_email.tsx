import React, { useState } from "react";
import { updateUserAsync } from "../../services/api_client";
import { UserDetails } from "../../dtos/user_settings";

const ChangeEmail: React.FC = () => {
    const [userDetails, setUserDetails] = useState<UserDetails>({
        username: localStorage.getItem("username"),
        email: localStorage.getItem("email"),
    });
    const [newEmail, setNewEmail] = useState<string>("");
    let userId = localStorage.getItem("userId");

    const handleChangeEmail = async () => {
        if (userId) {
            await updateUserAsync(userId, { email: newEmail });
            localStorage.setItem("email", newEmail);
        }
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            email: newEmail,
        }));
        setNewEmail("");
    };

    return (
        <div>
            <p>Email: {userDetails.email}</p>
            <div className="input-group ">
                <input
                    className="form-control"
                    type="email"
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
    );
};

export default ChangeEmail;
