import React, { useState } from "react";
import { deleteUserAsync } from "../../services/api_client";

interface DeleteAccountProps {
    userId: string | null;
}

const DeleteAccount: React.FC<DeleteAccountProps> = ({ userId }) => {
    const [showDeleteConfirmation, setShowDeleteConfirmation] =
        useState<boolean>(false);

    const handleDeleteAccount = async () => {
        if (userId) {
            await deleteUserAsync(userId);
            localStorage.clear();
            window.location.href = "/";
        }
    };

    return (
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
    );
};

export default DeleteAccount;
