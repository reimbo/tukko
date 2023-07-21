import React, { useState, Fragment } from "react";
import { useMap } from 'react-leaflet'
import "./css/FeedbackForm.css";
import Collapsible from "react-collapsible";
import feedback from "../../assets/darkButtonIcons/feedback.svg";
import { Tooltip } from "react-tooltip";
import { useTranslation } from "react-i18next";

interface Inputs {
  title?: string;
  description?: string;
}

export const FeedbackForm = () => {
  const { t } = useTranslation(["feedback"]);
  const initialInputs: Inputs = {};
  const [inputs, setInputs] = useState<Inputs>(initialInputs);
  const [error, setError] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const map = useMap()

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputs.title || !inputs.description) {
      setError(t("fillRequiredFields"));
      setFormSubmitted(true);
      return;
    }

    try {
      const response = await fetch(`${window.API_URL}/tms/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Success:", responseData);
        alert(t("issueCreatedSuccessfully"));
        setInputs(initialInputs);
        setError(null);
        setFormSubmitted(false);
      } else {
        const error = await response.json();
        setError(`Error: ${error.message}`);
      }
    } catch (error: any) {
      setError(`Error: ${error.message}`);
    }
  };

  const isFieldEmpty = (fieldName: keyof Inputs) => {
    return !inputs[fieldName] && formSubmitted;
  };

  return (
    <Fragment>
      <Collapsible
        className="CollapsibleClosed"
        openedClassName="CollapsibleOpen"
        trigger={
          <img
            className="feedback-icon"
            src={feedback}
            alt="feedback"
            data-tooltip-id="feedback-tooltip"
            data-tooltip-content="Feedback"
            data-tooltip-place="right"
          />
        }
      >
        <div 
          className="collapsibleContent"         
          onMouseEnter={() => map.dragging.disable() && map.scrollWheelZoom.disable()}
          onMouseLeave={() => map.dragging.enable() && map.scrollWheelZoom.enable()}>
          <p className="FeedbackTitle">{t("giveFeedback")}</p>
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="title"
              className={`label ${isFieldEmpty("title") ? "error" : ""}`}
            >
              {t("title")}
            </label>
            <br />
            <input
              className={`input ${isFieldEmpty("title") ? "error" : ""}`}
              type="text"
              name="title"
              value={inputs.title || ""}
              onChange={handleChange}
            />{" "}
            <br />
            <label
              htmlFor="description"
              className={`label ${isFieldEmpty("description") ? "error" : ""}`}
            >
              {t("enterDescription")}
            </label>
            <br />
            <textarea
              className={`input ${isFieldEmpty("description") ? "error" : ""}`}
              name="description"
              value={inputs.description || ""}
              onChange={handleChange}
              rows={5}
            />{" "}
            <br />
            {error && <p className="error">{error}</p>}
            <input type="submit" value={t("submit")} className="submitButton" />
          </form>
        </div>
      </Collapsible>
      <Tooltip id="feedback-tooltip" />
    </Fragment>
  );
};
