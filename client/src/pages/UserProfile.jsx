import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiEditCircleFill } from 'react-icons/ri';
import { BsCheckCircleFill } from 'react-icons/bs';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { UserContext } from '../context/userContext';
import axios from 'axios';

const UserProfile = () => {
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [isAvatarTouched, setIsAvatarTouched] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${currentUser.id}`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });
        const { name, email, avatar } = response.data;
        setName(name);
        setEmail(email);
        setAvatar(avatar);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, [currentUser.id, token]);

  const changeAvatarHandler = async () => {
    setIsAvatarTouched(false);
    try {
      const postData = new FormData();
      postData.set('avatar', avatar);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/change-avatar`,
        postData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      setAvatar(response?.data.avatar);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUserHandler = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/users/${currentUser.id}`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        navigate('/logout');
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const updateUserDetails = async (e) => {
    e.preventDefault();
    try {
      const userData = new FormData();
      userData.set('name', name);
      userData.set('email', email);
      userData.set('currentPassword', currentPassword);
      userData.set('newPassword', newPassword);
      userData.set('confirmNewPassword', confirmNewPassword);

      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/users/edit-user`,
        userData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        navigate('/logout');
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <section className="profile">
      <div className="container profile__container">
        <Link to={`/myposts/${currentUser.id}`} className="btn">
          My Posts
        </Link>
        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`} alt="" />
            </div>
            <form className="avatar__form">
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={(e) => setAvatar(e.target.files[0])}
                accept="png, jpeg, jpg, avif, gif, jfif, pjpeg, pjp"
              />
              <label htmlFor="avatar" onClick={() => setIsAvatarTouched(true)}>
                <RiEditCircleFill />
              </label>
            </form>
            {isAvatarTouched && (
              <button className="profile__avatar-btn" onClick={changeAvatarHandler}>
                <BsCheckCircleFill />
              </button>
            )}
          </div>
          <h1>{currentUser.name}</h1>
          <form className="form profile__form" onSubmit={updateUserDetails}>
            {error && <p className="form__error-message">{error}</p>}
            <input type="text" placeholder="Enter Your Full Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <div className="password-input-wrapper">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                placeholder="Enter Your Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="password-input-wrapper">
              <input
                type={showNewPassword ? 'text' : 'password'}
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="password-input-wrapper">
              <input
                type={showConfirmNewPassword ? 'text' : 'password'}
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
              >
                {showConfirmNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="container1">
              <button type="submit" className="btn primary">
                Update My Details
              </button>
              <button type="button" className="btn danger" onClick={deleteUserHandler}>
                Delete Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
