import React, { useState } from 'react'
import "./form.css"
const Form = () => {
    const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

 

  const handleSubmit = async(event) => {
    event.preventDefault();
   try {
    const response=await fetch("http://localhost:5000/form",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({       
            firstName,
            lastName,
            email}
        )})
        if(response.ok){
            setFirstName('');
            setLastName('');
            setEmail('');
        }
        else {
            console.error('Error submitting form');
          }
   } catch (error) {
    
   }
    // Clear form fields after submission
   
  
  };

  return (
    <div className="form-container">
      <h2>Basic Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <br />
       
       
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
  

export default Form