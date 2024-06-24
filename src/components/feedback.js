import React, { useState } from 'react';
import './feedback.css'
import {toast} from 'react-toastify'

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    Role: '',
    message: ''
  });
  const [dis,setdis] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setdis(true)
 await fetch('http://localhost:5000/recieving_complains',
  {method:'post',
    headers:{
      'Content-type' : 'application/json'
    },
    body:JSON.stringify(formData)
  })
  .then(res => res.json())
  .then((ress) =>
    { if(ress.message==="check your email please"){
      toast.success('Your feedback has submitted successfully', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
     }
    else{
      toast.error('Email doesnt exist', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    }}
)
  .catch( error => {toast.error('Server error', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });})
  setdis(false)

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
        <button type="submit" className="submit-button" disabled={dis} > { !dis ? "Submit" : "Sending..." }</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
