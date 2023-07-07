
import { useState, Fragment } from 'react';
import "./css/FeedbackForm.css";
import Collapsible from 'react-collapsible';
import feedback from "../../assets/darkButtonIcons/feedback.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";



interface Inputs {
  title?: string;
  description?: string;
}

export const FeedbackForm = () => {
  const initialInputs: Inputs = {};
  const [inputs, setInputs] = useState<Inputs>(initialInputs);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("localhost:3001/tms/feedback", {
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
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  return (

    <Fragment>
    <Collapsible 
    className="CollapsibleClosed" 
    openedClassName='CollapsibleOpen' 
    trigger={
      <img className="feedback-icon" src={feedback} alt="feedback"/>
    }>
      <div className="collapsibleContent">
        <p className='FeedbackTitle'>Give Feedback</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title" className='label'>Enter the title:</label> <br/>
            <input
              className='input'
              type="text"
              name="title"
              value={inputs.title || ''}
              onChange={handleChange}
            /> <br/>
          <label htmlFor='description' className='label'>Enter the description:</label> <br/>
            <textarea
              className='input'
              name="description"
              value={inputs.description || ''}
              onChange={handleChange}
              rows={5}
            /> <br/>
          <input type="submit" value="Submit" className='submitButton'/>
        </form>
      </div>
    </Collapsible>
  </Fragment>
  );
};
