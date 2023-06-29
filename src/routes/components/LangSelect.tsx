import { Fragment, useState } from "react";
import i18next from "i18next";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import "./css/LanguageToggle.css"

export const LangToggle = () => {
  const [language, setLanguage] = useState(i18next.language);
  let kieli = language === "en" ? "FI" : "EN";
  let iconClass = language === "en" ? "fi fi-fi" : "fi fi-gb";

  const handleLanguageChange = () => {
    const newLanguage = language === "en" ? "fi" : "en";
    setLanguage(newLanguage);
    i18next.changeLanguage(newLanguage);
/*     console.log(newLanguage, "newlang")
    console.log(language, "lang")
    console.log(i18next.language,"i18l") */

  };

  return (
    <Fragment>
      <button
        className={`languageToggle ${iconClass}`}
        onClick={handleLanguageChange}
        aria-label="Language toggle"
      ><p
        aria-label="Language abbreviation"
        className={"langText"}>
        {kieli}
        </p>
      </button>
    </Fragment>
  );
};
