import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ColorModeToggler from "../dark_theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonThroughWindow } from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
    isAuthenticated: boolean;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        const keyToKeep = "theme";
        const valueToKeep = localStorage.getItem(keyToKeep);
        localStorage.clear();
        if (valueToKeep) localStorage.setItem(keyToKeep, valueToKeep);

        navigate("/");
    };

    const handleJoinUsClick = () => {
        navigate("/registration");
    };

    return (
        <header className="header">
            <ColorModeToggler />
            <div className="breadcrumb_custom">
                {isAuthenticated ? (
                    <p className="breadcrumb_hello">
                        Hello,
                        <Link to={`/user/${localStorage.getItem("userId")}`}>
                            {localStorage.getItem("username")}
                        </Link>
                        !
                    </p>
                ) : (
                    <p className="breadcrumb_hello">
                        Hello, guest! You can join us ➔
                    </p>
                )}
                {isAuthenticated ? (
                    <button className="btn btn-info" onClick={handleLogout}>
                        Log out
                    </button>
                ) : (
                    <button className="btn" onClick={handleJoinUsClick}>
                        <FontAwesomeIcon
                            icon={faPersonThroughWindow}
                            size="2xl"
                            style={{ color: "#0b949d" }}
                        />
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
