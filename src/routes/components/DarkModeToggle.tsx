import { useState, useEffect } from "react";
import Toggle from "react-toggle";
import { useMediaQuery } from 'react-responsive'
import "./DarkModeToggle.css"

export const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);


  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
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
    <Toggle
      className="Toggle"
      checked={isDark}
      onChange={({ target }) => setIsDark(target.checked)}
      icons={{ checked: "🌙", unchecked: "🔆" }}
      aria-label="Dark mode toggle"
    />
  );
};