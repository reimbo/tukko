import { useState, Fragment } from 'react';
import "./css/FeedbackForm.css";
import Collapsible from 'react-collapsible';
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

    const url = "https://gitlab.labranet.jamk.fi/api/v4/projects/23409/issues";
    const params = new URLSearchParams({
      title: inputs.title || "",
      description: inputs.description || "",
      labels: "Customer Feedback",
    });

    const token = import.meta.env.VITE_PROJECT_ACCESS_TOKEN as string;

    const headers = {
      "Private-Token": token,
    };

    try {
      const response = await fetch(`${url}?${params}`, {
        method: "POST",
        headers: headers,
      });

      if (response.ok) {
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
    trigger={<FontAwesomeIcon
              icon={faCommentAlt}
              style={{ color: "#5b5b5b" }}
              className="feedback-icon"
            />}>
      <div className="collapsibleContent">
        <p className='FeedbackTitle'>Give Feedback</p>
        <form onSubmit={handleSubmit}>
          <label>
            Enter the title:
            <input
              className='input'
              type="text"
              name="title"
              value={inputs.title || ''}
              onChange={handleChange}
            />
          </label> <br/>
          <label>
            Enter the description:
            <textarea
              className='input'
              name="description"
              value={inputs.description || ''}
              onChange={handleChange}
              rows={3}
            />
          </label>
          <input type="submit" />
        </form>
      </div>
    </Collapsible>
  </Fragment>

  );
};
