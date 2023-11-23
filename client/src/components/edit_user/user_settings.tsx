import React from "react";
import DeleteAccount from "./delete_account";
import ChangePassword from "./change_password";
import ChangeEmail from "./change_email";
import ChangeUsername from "./change_username";
import BackButton from "../buttons/back_to_main";

const AccountSettings: React.FC = () => {
    let userId = localStorage.getItem("userId");

    return (
        <div>
            <h2>Account Settings</h2>
            <ChangeUsername />
            <ChangeEmail />
            <ChangePassword />
            <DeleteAccount userId={userId}></DeleteAccount>
            <BackButton to="/authorised" />
        </div>
    );
};

export default AccountSettings;
