import { useState, useEffect } from "react";
import Toggle from "react-toggle";
import { useMediaQuery } from "react-responsive";
import "./css/DarkModeToggle.css";
import "react-toggle/style.css";
import { Fragment } from "react";

// Imports icon assets
import sunIcon from "../../assets/toggleIcons/sun.svg";
import moonIcon from "../../assets/toggleIcons/moon.svg";

export const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  // Adds/removes css class "dark" from body element when isDark updates
  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  // Checks users system color scheme preference
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

        // Updates "isDark" state on click
        checked={isDark}
        onChange={({ target }) => setIsDark(target.checked)}
        aria-label="Dark mode toggle"
        icons={{
          checked: (
            <img src={sunIcon} alt="Sun Icon" className="toggle-icon" />
          ),
          unchecked: (
            <img src={moonIcon} alt="Moon Icon" className="toggle-icon" />
          ),
        }}
      />
    </Fragment>
  );
};
