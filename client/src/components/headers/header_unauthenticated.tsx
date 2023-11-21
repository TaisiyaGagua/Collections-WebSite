import React from "react";
import { useNavigate } from "react-router-dom";
import ColorModeToggler from "../dark_theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonThroughWindow } from "@fortawesome/free-solid-svg-icons";

const HeaderUnauthenticated: React.FC = () => {
    const navigate = useNavigate();

    const handleJoinUsClick = () => {
        navigate("/registration");
    };

    return (
        <header>
            <ColorModeToggler></ColorModeToggler>
            <div className="breadcrumb_custom">
                <p className="breadcrumb_hello">
                    Hello, guest! You can join us ➔
                </p>
                <button className="btn" onClick={handleJoinUsClick}>
                    <FontAwesomeIcon
                        icon={faPersonThroughWindow}
                        size="2xl"
                        style={{ color: "#0b949d" }}
                    />
                </button>
            </div>
        </header>
    );
};

export default HeaderUnauthenticated;
