import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, email, password } = values;
      try {
        const { data } = await axios.post(registerRoute, { username, email, password });
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        } else {
          localStorage.setItem('chat-app-user', JSON.stringify(data.user));
          toast.success("Registration successful!", toastOptions);
          navigate('/');
        }
      } catch (error) {
        console.error("Registration error:", error);
        if (error.response) {
          toast.error(error.response.data.msg || "An error occurred during registration", toastOptions);
        } else {
          toast.error("Could not connect to the server", toastOptions);
        }
      }
    }
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be at least 8 characters", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FromContainer>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>BroCode</h1>
          </div>
          <input type="text" name="username" placeholder='Username' onChange={handleChange} />
          <input type="email" name="email" placeholder='Email' onChange={handleChange} />
          <input type="password" name="password" placeholder='Password' onChange={handleChange} />
          <input type="password" name="confirmPassword" placeholder='Confirm password' onChange={handleChange} />
          <button type="submit">Create User</button>
          <span>Already have an account? <Link to='/login'>Login</Link></span>
        </form>
      </FromContainer>
      <ToastContainer />
    </>
  );
}
const FromContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324;
.brand{
  display : flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  img{
    height: 5rem;

  }
  h1{
    color: white;
  }
}
form{
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #00000076;
  border-radius: 2rem;
  padding: 3rem 5rem;
  input{
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size:1rem;
    &:focus{
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button{
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover{
      background-color: #4e0eff;
    }
  }
  span{
    color: white;
    text-transform: uppercase;
    a{
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
}
`;
export default Register
