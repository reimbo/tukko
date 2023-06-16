import { useState, useEffect } from "react";
import Toggle from "react-toggle";
import { useMediaQuery } from "react-responsive";
import "./css/DarkModeToggle.css";
import "react-toggle/style.css";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

export const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)",
    },
    undefined,
    (isSystemDark) => setIsDark(isSystemDark)
  );

  return (
    <Fragment>
      <Toggle
        className="Toggle"
        checked={isDark}
        onChange={({ target }) => setIsDark(target.checked)}
        aria-label="Dark mode toggle"
        icons={{
          checked: (
            <FontAwesomeIcon
              icon={faSun}
              style={{ color: "#FBE106" }}
              className="toggle-icon"
            />
          ),
          unchecked: (
            <FontAwesomeIcon
              icon={faMoon}
              style={{ color: "white" }}
              className="toggle-icon"
            />
          ),
        }}
      />
    </Fragment>
  );
};
