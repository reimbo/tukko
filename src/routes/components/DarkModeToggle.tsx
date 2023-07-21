import { useState, useEffect } from "react";
import { useMap } from "react-leaflet";
import Toggle from "react-toggle";
import { useMediaQuery } from "react-responsive";
import "react-toggle/style.css";
import "./css/DarkModeToggle.css";

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

  const map = useMap()

  return (
    <div
        id="toggleContainer"
        onMouseEnter={() => map.dragging.disable() && map.scrollWheelZoom.disable()}
        onMouseLeave={() => map.dragging.enable() && map.scrollWheelZoom.enable()}
    >
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
    </div>
  );
};
