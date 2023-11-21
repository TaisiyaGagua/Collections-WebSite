import React from "react";
import BackToAuthorisedBtn from "../buttons/back_to_authorised_btn";
import DeleteAccount from "./delete_account";
import ChangePassword from "./change_password";
import ChangeEmail from "./change_email";
import ChangeUsername from "./change_username";

const AccountSettings: React.FC = () => {
    let userId = localStorage.getItem("userId");

    return (
        <div>
            <h2>Account Settings</h2>
            <ChangeUsername></ChangeUsername>
            <ChangeEmail></ChangeEmail>
            <ChangePassword></ChangePassword>
            <DeleteAccount userId={userId}></DeleteAccount>
            <BackToAuthorisedBtn />
        </div>
    );
};

export default AccountSettings;
