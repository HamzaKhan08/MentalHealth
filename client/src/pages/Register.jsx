import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const changeInputHandle = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, userData);
      const newUser = await response.data;
      console.log(newUser);
      if (!newUser) {
        setError('Could not register user. Please try again!');
      }
      navigate('/login');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <section className="register">
      <div className="containerrr">
        <h2>Signup</h2>
        <form className="form register__form" onSubmit={registerUser}>
          {error && <p className="form__error-message">{error}</p>}
          <input
            type="text"
            placeholder="Enter Your Name"
            name="name"
            value={userData.name}
            onChange={changeInputHandle}
          />
          <input
            type="text"
            placeholder="Enter Your Email"
            name="email"
            value={userData.email}
            onChange={changeInputHandle}
          />
          <div className="password-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter Password"
              name="password"
              value={userData.password}
              onChange={changeInputHandle}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="password-input-wrapper">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              name="password2"
              value={userData.password2}
              onChange={changeInputHandle}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          

          <button type="submit" className="btn primary">
            Register
          </button>
          <small>
            Already have an account?{' '}
            <Link className="btn" to="/login">
              Login
            </Link>
          </small>
        </form>
      </div>
    </section>
  );
};

export default Register;
