import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from 'redux/session/sessionSlice';

const Login = () => {
  const { loading } = useSelector((store) => store.session);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await dispatch(login({ name }));
      setName('');
      setError(null);
    } catch (error) {
      setError('Wrong name, please check.');
    }
  };

  return (
    <div className="form-wrap">
      {error && <p className="error-message" id="name-error">{error}</p>}
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
        </label>
        <label htmlFor="password" className="form-label">
          Password:
          <input
            type="text"
            className="form-control"
            id="password"
            placeholder="Your Username"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label htmlFor="confirm-password" className="form-label">
          Password:
          <input
            type="text"
            className="form-control"
            id="confirm-password"
            placeholder="Your Username"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>

        <div className="link mt-2 d-flex justify-content-between w-100">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'signing in...' : 'Sign up'}
          </button>
          <Link to="/" className="btn text-light btn-secondary">Log in</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
