import { Fragment, useState, useEffect } from "react";
import i18next from "i18next";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import "./css/LanguageToggle.css";
import { useMap } from "react-leaflet";
import { Tooltip } from 'react-tooltip';

export const LangToggle = () => {
  const [language, setLanguage] = useState(i18next.language);
  const map = useMap();

  useEffect(() => {
    if (language === "fi") map.pm.setLang("fi")
  }, [map.pm, language])

  const kieli = language === "en" ? "EN" : "FI";
  const iconClass = language === "en" ? "fi fi-gb" : "fi fi-fi";

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
        data-tooltip-id="local-tooltip"
        data-tooltip-content="Change language"
        data-tooltip-place="top"
        type="button"
      >
        <p aria-label="Language abbreviation" className={"langText"}>
          {kieli}
        </p>
      </button>
      <Tooltip id="local-tooltip"/>
    </Fragment>
  );
};
