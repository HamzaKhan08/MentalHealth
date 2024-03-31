import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { UserContext } from '../context/userContext.js';

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { setCurrentUser } = useContext(UserContext);

  const handleChangeInput = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, userData);
      const user = await response.data;
      setCurrentUser(user);
      setUserData({ email: '', password: '', selectedImages: '' }); // Clear input fields
      navigate('/');
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred while processing your request.');
      }
    }
  };

  return (
    <section className="login">
      <div className="containerrr">
        <h2>Login</h2>
        <form className="form login__form" onSubmit={loginUser}>
          {error && <p className="form__error-message">{error}</p>}
          <input
            type="text"
            placeholder="Enter Your Email"
            name="email"
            value={userData.email}
            onChange={handleChangeInput}
            autoFocus
            aria-label="Email"
          />
          <div className="password-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter Password"
              name="password"
              value={userData.password}
              onChange={handleChangeInput}
              aria-label="Password"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="container1">
            <button type="submit" className="btn primary">
              Login
            </button>
            <Link to="/resetPassword" className="btn">
              Reset Password
            </Link>
          </div>
          <small>
            Don't have an account? Click here to{' '}
            <Link to="/register" className="btn">
              Register
            </Link>
          </small>
        </form>
      </div>
    </section>
  );
};

export default Login;
