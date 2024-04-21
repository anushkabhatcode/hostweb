import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "../../assets/css/Login.css";
import "../../assets/css/Header.css";
import Header from '../Header';
import Footer from '../Footer';
import UserContext from './UserContext';
import validator from 'validator';
import { Typography } from '@mui/material';

const Login = () => {
    
  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;
  const { setUser } = useContext(UserContext);

  const [successMessage, setSuccessMessage] = useState(null);

  const [stayLoggedIn, setStayLoggedIn] = useState(false);

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
          const response = await fetch('http://localhost:4000/users/login', {
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
          // setUser(data.username);
          const { token } = await response.json();
          localStorage.setItem('token', token); 
          // setUser(data.username, stayLoggedIn);
          setUser(data.username.charAt(0).toUpperCase() + data.username.slice(1), stayLoggedIn);
          setSuccessMessage("Logged in successfully!");
          setData({
            username: '',
            password: '',
          });
          setTimeout(() => {
            navigate(from?.pathname || "/home", { replace: true });
          }, 1000);
        
        }else{
        const errorData = await response.json();
        console.error('Login failed:', errorData.error);
        }
      } catch(error){
        console.error('Login error:', error);
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

    // Password Validation
    if (!data.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (!isValidPassword(data.password.trim())) {
        newErrors.password = 'Weak Password: Your password must be have at least 8 characters long, 1 uppercase & 1 lowercase character, 1 number & 1 symbol';
        hasError = true;
    } else {
        hasError = false;
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
              Login
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
              
              <div className="input-control">
                <label htmlFor="stayLoggedIn" className=''>Stay Logged In? 
                <input type="checkbox" 
                  id="stayLoggedIn" 
                  name="stayLoggedIn" 
                  className='' 
                  checked={stayLoggedIn}
                  onChange={(e) => setStayLoggedIn(e.target.checked)}
                />
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
            Don't have an account? <Link to="/register">Register</Link>
                
          </div>
        </main> 
        <Footer />

    </>
  );
};


export default Login;