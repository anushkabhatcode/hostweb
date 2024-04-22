import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "../../assets/css/Login.css";
import "../../assets/css/Header.css";
import Header from '../Header';
import Footer from '../Footer';
import UserContext from './UserContext';
import validator from 'validator';
import Typography from '@mui/material/Typography';

const Register = () => {
    
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;
  const { setUser } = useContext(UserContext);
  const [successMessage, setSuccessMessage] = useState(null);

  //Handling form validation
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
      setData({
        ...data,
        [event.target.name]: event.target.value,
      });
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
      if(validateInputs()){

        try{
          const response = await fetch('https://moodbackend.onrender.com/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: data.username,
                email:data.email,
                password: data.password
            })
        });

        if(response.ok){
        setSuccessMessage("Registered successfully!");
        console.log('f{data.username} Registration successful');
        setData({
          username: '',
          email: '',
          password: '',
        });
        //set a timeout
        setTimeout(() => {
          navigate(from?.pathname || "/", { replace: true });
        }
        , 1000);
        }else{
        const errorData = await response.json();
        console.error('Registration failed:', errorData.error);
        }
      } catch(error){
        console.error('Registration error:', error);
        }
      }
  };

 
  //using validator for password verification
  // Source: https://www.geeksforgeeks.org/create-a-password-validator-using-reactjs/
  const isValidPassword = (password) => { 
  
    if (validator.isStrongPassword(password, { 
        minLength: 8, minLowercase: 1, 
        minUppercase: 1, minNumbers: 1, minSymbols: 1 
    })) { 
        return true;
    } else { 
        return false;
    } 
} 

  const validateInputs = () => {
    let hasError = false;
    const newErrors = {};

    // Username Validation
    if (!data.username.trim()) {
      newErrors.username = 'Username is required';
      hasError = true;
    }

    // Email Validation
    if (!data.email.trim()) {
      newErrors.email = 'Email is required'; 
      hasError = true;
    } else if (!validator.isEmail(data.email.trim())) {
        newErrors.email = 'Invalid Email';
        hasError = true;
    } else {
    }



    // Password Validation
    if (!data.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (!isValidPassword(data.password.trim())) {
        newErrors.password = 'Weak Password: Minimum 8 characters, 1 uppercase, 1 lowercase, 1 number & 1 symbol';
        hasError = true;
    } else { 
    }

    setErrors(newErrors);
    return !hasError;
  };


  return (
    <>
      <Header
            // title="MOODHarbor"
            subtitle="A Feeling of Peace"
      />
       
      <main className="login-container">   
            
        <div className='form-container'>
          {from && <div className="login-error">You must log in first!</div>}
          <form className="form" onSubmit={handleSubmit} autoComplete="new-password">
            <div className='form-title'>
              Register
            </div>
            <div className={`input-control ${errors.username ? 'error' : (data.username ? 'success' : '')}`}>
              <label className="form-label" >
                Username
                <input type="text" 
                name="username" 
                className='form-group' 
                placeholder='Enter Your Username'
                autoComplete="new-password"
                value={data.username}
                onChange={handleChange}
                />
                {errors.username && <div className="error-message">{errors.username}</div>}
              </label>
              </div>

              {/* Adding an email field */}
              <div className={`input-control ${errors.email ? 'error' : (data.email ? 'success' : '')}`}>
                <label className="form-label" >
                  Email Address
                  <input type="text" 
                  name="email" 
                  className='form-group' 
                  placeholder='Enter Your Email Address'
                  autoComplete="new-password"
                  value={data.email}
                  onChange={handleChange}
                  />
                  {errors.email && <div className="error-message">{errors.email}</div>}
                </label>
              </div>
              
              <div className={`input-control ${errors.password ? 'error' : (data.password ? 'success' : '')}`}>
                <label htmlFor="password" className='form-label'>Password
                <input type="password" 
                placeholder="Enter Your Password" 
                autoComplete="new-password"
                id="password" 
                name="password" 
                className='form-group' 
                value={data.password}
                onChange={handleChange}
                />
                
                {errors.password && <div className="error-message">{errors.password}</div>}
                </label>
              </div>
                           

              <div className='button-section'>
                <button className='button' type='submit'>
                  <span>Submit</span>
                </button>
              </div>
            </form>
            <Typography variant="body2" className="success-message" style={{ color: 'green', marginTop: '10px' }}>
              {successMessage}
            </Typography>
            Already have an account? <Link to="/">Login</Link>
                
          </div>
        </main> 
        <Footer />

    </>
  );
};


export default Register;