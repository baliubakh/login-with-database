import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//Styles
import './Login.css';
//Components
import Spinner from '../Spinner';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!/\S+@\S+\.\S+/.test(email) || password.length < 8) {
      setIsLoading(false);
      setErrorMsg('Invalid email or password');
    } else {
      await axios
        .post('http://localhost:5000/login', {
          email,
          password,
        })
        .then((res) => {
          setIsLoading(false);
          if (isChecked) {
            document.cookie = `user_info=${JSON.stringify(res.data)}`;
            window.location.reload();
          } else {
            if (localStorage.hasOwnProperty('user_info')) {
              localStorage.removeItem('user_info');
            }
            localStorage.setItem('user_info', JSON.stringify(res.data));
          }
          window.location.reload();
        })
        .catch((err) => {
          setIsLoading(false);
          setErrorMsg(err.response.data.message);
        });
    }
  };
  const handleCheck = () => {
    setIsChecked((prev) => !prev);
  };
  return (
    <section className="section">
      {errorMsg.length !== 0 && <div className="errorMsg">{errorMsg}</div>}
      <form className="login-form">
        <input
          type="email"
          ref={emailRef}
          onChange={() => {
            setEmail(emailRef.current.value);
          }}
          placeholder="Your Email"
          className="form-input"
          required
        />
        <input
          type="password"
          ref={passwordRef}
          onChange={() => {
            setPassword(passwordRef.current.value);
          }}
          placeholder="Password"
          className="form-input"
          required
        />
        <label htmlFor="checkbox" className="checkbox-label ">
          <input type="checkbox" name="checkbox" onChange={handleCheck} />
          Remember Me
        </label>
        {(isLoading && <Spinner />) || (
          <input type="submit" onClick={handleSubmit} className="submit-btn" />
        )}
      </form>
      <span>
        Don't have an account? &#8594;
        <Link to="/signup" className="signup-link">
          Sign Up
        </Link>
      </span>
    </section>
  );
};

export default Login;
