import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();

        navigate("/");
    };

    return (
        <header>
            <div className="breadcrumb_custom">
                <p className="breadcrumb_hello">
                    Hello,
                    <Link to={`/user/${localStorage.getItem("userId")}`}>
                        {localStorage.getItem("username")}
                    </Link>
                    !
                </p>
                <button className="btn btn-info" onClick={handleLogout}>
                    Log out
                </button>
            </div>
        </header>
    );
};

export default Header;
