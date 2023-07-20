import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from 'redux/session/sessionSlice';

const SignUp = () => {
  const { loading } = useSelector((store) => store.session);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [error, setError] = useState(null);

  const validateForm = () => {
    let isValid = true;

    setNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);
    setError(null);

    if (!name) {
      setNameError('Please enter your name.');
      isValid = false;
    }

    if (!email) {
      setEmailError('Please enter your email.');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email.');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Please enter your password.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password should be at least 6 characters long.');
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password.');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        await dispatch(signUp({ name, email, password }));
        setError(null);
        navigate('/login');
      } catch (error) {
        setError('Something Went Wrong');
      }
    }
  };

  return (
    <div className="form-wrap">
      {error && <small className="error-message fs-5 text-danger" id="name-error">{error}</small>}
      <h3>Sign Up</h3>
      <form onSubmit={handleLogin}>
        <label htmlFor="name" className="form-label">
          User Name:
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Your Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-describedby="name-error"
          />
          {nameError && <small className="error-message fs-5 text-danger">{nameError}</small>}
        </label>
        <label htmlFor="email" className="form-label">
          Your Email:
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <small className="error-message fs-5 text-danger">{emailError}</small>}
        </label>
        <label htmlFor="password" className="form-label">
          Password:
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <small className="error-message fs-5 text-danger">{passwordError}</small>}
        </label>
        <label htmlFor="confirm-password" className="form-label">
          Confirm Password:
          <input
            type="password"
            className="form-control"
            id="confirm-password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPasswordError && (
            <small className="error-message fs-5 text-danger">{confirmPasswordError}</small>
          )}
        </label>

        <div className="link mt-2 d-flex justify-content-between w-100">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'signing in...' : 'Sign up'}
          </button>
          <Link to="/login" className="btn text-light btn-secondary">
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
