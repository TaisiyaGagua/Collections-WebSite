import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkUserAsync } from "../../services/api_client";
import { CheckUserDto } from "../../dtos/requests/check_user_dto";

const Auth: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (email: string, password: string) => {
        try {
            const payload = { email, password } as CheckUserDto;
            const response = await checkUserAsync(payload);

            if (response.error || response.data?.success === false) {
                window.alert(response.data?.message);
            }

            if (response.data?.success) {
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("username", `${response.data.username}`);
                localStorage.setItem("email", `${response.data.email}`);
                localStorage.setItem("userId", `${response.data.userId}`);
                navigate("/authorised");
            }
        } catch (error) {
            window.alert(error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button
                className="btn btn-info"
                onClick={() => handleLogin(email, password)}
            >
                Log in
            </button>
        </div>
    );
};

export default Auth;
