import { useState, Fragment } from "react";
import "./css/FeedbackForm.css";
import Collapsible from 'react-collapsible';
import feedback from "../../assets/darkButtonIcons/feedback.svg";
import { Tooltip } from 'react-tooltip'

interface Inputs {
  title?: string;
  description?: string;
}

export const FeedbackForm = () => {
  const initialInputs: Inputs = {};
  const [inputs, setInputs] = useState<Inputs>(initialInputs);
  const [error, setError] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false); // Track if form has been submitted

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
      setError("Please fill in all required fields.");
      setFormSubmitted(true); // Set formSubmitted to true when there is an error
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
        alert("Issue created successfully!");
        setInputs(initialInputs);
        setError(null);
        setFormSubmitted(false); // Reset formSubmitted after successful submission
      } else {
        const error = await response.json();
        setError(`Error: ${error.message}`);
      }
    } catch (error: any) {
      setError(`Error: ${error.message}`);
    }
  };

  const isFieldEmpty = (fieldName: keyof Inputs) => {
    return !inputs[fieldName] && formSubmitted; // Check if form has been submitted
  };

  return (
    <Fragment>
      <Collapsible 
        className="CollapsibleClosed" 
        openedClassName='CollapsibleOpen' 
        trigger={
          <img 
            className="feedback-icon" 
            src={feedback} 
            alt="feedback" 
            data-tooltip-id="feedback-tooltip"
            data-tooltip-content="Feedback"
            data-tooltip-place="right"/>
        }>
        <div className="collapsibleContent">
          <p className='FeedbackTitle'>Give Feedback</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title" className={`label ${isFieldEmpty("title") ? "error" : ""}`}>Enter the title:</label> <br/>
            <input
              className={`input ${isFieldEmpty("title") ? "error" : ""}`}
              type="text"
              name="title"
              value={inputs.title || ''}
              onChange={handleChange}
            /> <br/>
            <label htmlFor='description' className={`label ${isFieldEmpty("description") ? "error" : ""}`}>Enter the description:</label> <br/>
            <textarea
              className={`input ${isFieldEmpty("description") ? "error" : ""}`}
              name="description"
              value={inputs.description || ''}
              onChange={handleChange}
              rows={5}
            /> <br/>
            {error && <p className="error">{error}</p>}
            <input type="submit" value="Submit" className='submitButton'/>
          </form>
        </div>
      </Collapsible>
      <Tooltip id="feedback-tooltip"/>
    </Fragment>
  );
};
