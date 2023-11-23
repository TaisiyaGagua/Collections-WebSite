import React, { useState } from "react";
import LoginForm from "./login_form";
import { CreateUserComponent } from "./create_user_form";
import BackButton from "../buttons/back_to_main";

const AuthenticationContainer: React.FC = () => {
    const [isRegistrationPage, setIsRegistrationPage] = useState(true);

    return (
        <div className="col-md-6 offset-md-3">
            {isRegistrationPage ? (
                <div className="registration_container">
                    <h1>User registration</h1>
                    <CreateUserComponent />
                    <div className="checking_container">
                        <h6>Already have an account?</h6>
                        <button
                            className="btn btn-info"
                            onClick={() => setIsRegistrationPage(false)}
                        >
                            Log in
                        </button>
                    </div>
                </div>
            ) : (
                <div className="autentification_container">
                    <LoginForm />
                    <div className="checking_container">
                        <h6>Don't have an account?</h6>
                        <button
                            className="btn btn-primary"
                            onClick={() => setIsRegistrationPage(true)}
                        >
                            Sign up
                        </button>
                    </div>
                </div>
            )}
            <BackButton to="/" />
        </div>
    );
};

export default AuthenticationContainer;
