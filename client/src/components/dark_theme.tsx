import React, { useState, useCallback } from "react";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ColorModeToggler: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = useCallback(() => {
        setIsDarkMode((prevIsDarkMode) => !prevIsDarkMode);
        const darkModeElement = document.getElementById("darkmode");

        if (darkModeElement) {
            if (!isDarkMode) {
                darkModeElement.setAttribute("data-bs-theme", "dark");
            } else {
                darkModeElement.removeAttribute("data-bs-theme");
            }
        }
    }, [isDarkMode]);

    return (
        <button className="btn" onClick={toggleTheme}>
            {isDarkMode ? (
                <FontAwesomeIcon
                    icon={faSun}
                    style={{ color: "#ffea00" }}
                    size="xl"
                />
            ) : (
                <FontAwesomeIcon
                    icon={faMoon}
                    style={{ color: "#fff700" }}
                    size="xl"
                />
            )}
        </button>
    );
};

export default ColorModeToggler;
