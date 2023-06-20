import { useState, useEffect } from "react";
import Toggle from "react-toggle";
import { useMediaQuery } from "react-responsive";
import "./css/DarkModeToggle.css";
import "react-toggle/style.css";
import { Fragment } from "react";

//Assets
import sunIcon from "../../assets/toggleIcons/sun.svg";
import moonIcon from "../../assets/toggleIcons/moon.svg";

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
