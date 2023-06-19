import React, { useState } from "react";
import "./FeedbackForm.css";

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
    <form className="FeedbackForm" onSubmit={handleSubmit}>
      <label>
        Enter the title:
        <input
          type="text"
          name="title"
          value={inputs.title || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Enter the description:
        <textarea
          name="description"
          value={inputs.description || ""}
          onChange={handleChange}
        />
      </label>
      <input type="submit" />
    </form>
  );
};

