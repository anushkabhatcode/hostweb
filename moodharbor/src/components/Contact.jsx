import React, { useContext, useEffect, useState } from 'react';
import UserContext from './Auth/UserContext';
import Header from './Header';
import Footer from './Footer';
import { Typography } from '@mui/material';


const Contact = () => {
  const { user } = useContext(UserContext);
  const [successMessage, setSuccessMessage] = useState(null);
  const [data, setData] = useState({
    title: '',
    message: '',
  });

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
};

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      //clear the form
      if(response.ok){
        setData({
          title: '',
          message: '',
        });
        setSuccessMessage("Message sent successfully!");
      }
    }
    catch (error) {
      console.error('Error:', error);
    }
  };




  return (
    <> 
        <Header 
            title="" 
            subtitle="" 
            name={user && `Hi ${user}`} 
            pageTitle="CONTACT US"
        />
      
        <div className="contact-container"> 
        {/* <main className="login-container">    */}   
        <div className='form-container'>

          <form className="form" autoComplete="new-password" onSubmit={handleSubmit}>
            <div className='form-title'>
              Contact Us
            </div>
            <div className="input-control">
              <label className="form-label" >
                Title
                <input type="text" 
                name="title" 
                className='form-group' 
                placeholder='Enter Your Message Title...'
                autoComplete="new-password"
                value={data.title}
                onChange={handleChange}
                />
                
              </label>
              </div>
              
              <div className="input-control">
                <label htmlFor="password" className='form-label'>Enter Your Message
                </label>
                <textarea 
                  name="message" 
                  id="message" 
                  cols="70" 
                  rows="10" 
                  placeholder="Enter Your Message here..."
                  value={data.message}
                  onChange={handleChange}
                  // className='form-group'
                  ></textarea>
                
                
                
              </div>
              <div className='button-section'>
                <button className='button' type='submit'>
                  <span>Send</span>
                </button>
              </div>
            </form>
            <Typography variant="body2" className="success-message" style={{ color: 'green', marginTop: '10px' }}>
              {successMessage}
            </Typography>

          </div>
        {/* </main>  */}
        </div>
        <Footer/>        
    </> 
  );
};

export default Contact;