import { Fragment, useState } from "react";
import i18next from "i18next";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import "./css/LanguageToggle.css";
import { useMap } from "react-leaflet";

export const LangToggle = () => {
  const [language, setLanguage] = useState(i18next.language);
  const map = useMap();
  let kieli = language === "en" ? "EN" : "FI";
  let iconClass = language === "en" ? "fi fi-gb" : "fi fi-fi";

  const handleLanguageChange = () => {
    const newLanguage = language === "en" ? "fi" : "en";
    setLanguage(newLanguage);
    i18next.changeLanguage(newLanguage);
    map.pm.setLang(newLanguage);
  };

  return (
    <Fragment>
      <button
        className={`languageToggle ${iconClass}`}
        onClick={handleLanguageChange}
        aria-label="Language toggle"
      >
        <p aria-label="Language abbreviation" className={"langText"}>
          {kieli}
        </p>
      </button>
    </Fragment>
  );
};
