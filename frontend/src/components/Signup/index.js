import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//Styles
import './Signup.css';
//Components
import Spinner from '../Spinner';

const Signup = () => {
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!/\S+@\S+\.\S+/.test(email) && password.length < 8) {
      setIsLoading(false);
      setErrorMsg(
        'Invalid email and password. Password must be at least 8 symbols'
      );
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setIsLoading(false);
      setErrorMsg('Invalid email');
    } else if (password.length < 8) {
      setIsLoading(false);
      setErrorMsg('Invalid password. Password must be at least 8 symbols');
    } else {
      setErrorMsg('');
      await axios
        .post('http://localhost:5000/signup', {
          name,
          email,
          password,
        })
        .then(() => {
          setIsLoading(false);
          window.location = '/';
        })
        .catch((err) => {
          setIsLoading(false);
          setErrorMsg(err.response.data.message);
        });
    }
  };
  return (
    <section className="section">
      {errorMsg.length !== 0 && <div className="errorMsg">{errorMsg}</div>}
      <form className="signup-form">
        <h1 className="signup-title">Sign up</h1>
        <label htmlFor="user-email">
          Email
          <input
            type="email"
            id="user-signup-email"
            ref={emailRef}
            onChange={() => {
              setEmail(emailRef.current.value);
            }}
            placeholder="Your Email"
            className="form-input"
            required
          />
        </label>
        <label htmlFor="user-signup-name">
          Name
          <input
            type="text"
            id="user-signup-name"
            ref={nameRef}
            onChange={() => {
              setName(nameRef.current.value);
            }}
            placeholder="Your Name"
            className="form-input"
            required
          />
        </label>
        <label htmlFor="user-signup-password">
          Password
          <input
            type="password"
            id="user-signup-password"
            ref={passwordRef}
            onChange={() => {
              setPassword(passwordRef.current.value);
            }}
            placeholder="Password"
            className="form-input"
            required
          />
        </label>
        {(isLoading && <Spinner />) || (
          <div className="submit-container">
            <input
              type="submit"
              onClick={handleSubmit}
              className="submit-btn"
            />
          </div>
        )}
      </form>
      <span>
        Already have an account? &#8594;
        <Link to="/" className="login-link">
          Log In
        </Link>
      </span>
    </section>
  );
};

export default Signup;
