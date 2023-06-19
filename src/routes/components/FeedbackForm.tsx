import { useState, Fragment } from 'react';
import "./css/FeedbackForm.css";


interface Inputs {
  title?: string;
  description?: string;
}

export const FeedbackForm = () => {
  const [inputs, setInputs] = useState<Inputs>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const url = 'https://gitlab.labranet.jamk.fi/api/v4/projects/23409/issues';
    const params = new URLSearchParams({
      title: inputs.title || '',
      description: inputs.description || '',
      labels: 'Customer Feedback'
    });

    const token = import.meta.env.VITE_PROJECT_ACCESS_TOKEN as string;
    console.log(token);

    const headers = {
      'Private-Token': token
    };

    try {
      const response = await fetch(`${url}?${params}`, {
        method: 'POST',
        headers: headers
      });

      if (response.ok) {
        // Handle success
        alert('Issue created successfully!');
      } else {
        // Handle error
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error: any) {
      // Handle network or other errors
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <Fragment>
    <form className="FeedbackForm" onSubmit={handleSubmit}>
      <p className="FeedBackTitle">Give Feedback</p>
      <label>
        Enter the title:
        <input
          className='input'
          type="text"
          name="title"
          value={inputs.title || ''}
          onChange={handleChange}
        />
      </label>
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
  </Fragment>

  );
};