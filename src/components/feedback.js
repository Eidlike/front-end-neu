import React, { useState } from 'react';
import './feedback.css'

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    Role: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="feedback-form">
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="input-field"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Role" className="label">Role:</label>
          <input
            type="text"
            id="Role"
            name="Role"
            className="input-field"
            value={formData.Role}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message" className="label">Message:</label>
          <textarea
            id="message"
            name="message"
            className="textarea-field"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
