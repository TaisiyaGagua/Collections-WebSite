import React, { useState, useCallback, useEffect } from "react";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ColorModeToggler: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const storedTheme = localStorage.getItem("theme");
        return storedTheme === "dark";
    });

    const toggleTheme = useCallback(() => {
        setIsDarkMode((prevIsDarkMode) => {
            const newMode = !prevIsDarkMode;
            localStorage.setItem("theme", newMode ? "dark" : "light");
            return newMode;
        });
    }, []);

    useEffect(() => {
        const darkModeElement = document.getElementById("darkmode");
        if (darkModeElement) {
            if (isDarkMode) {
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
