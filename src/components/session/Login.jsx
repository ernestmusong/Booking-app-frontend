import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { handleSession, login } from 'redux/session/sessionSlice';

const Login = () => {
  const { loading } = useSelector((store) => store.session);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    await dispatch(login({ email, password }));
    setError(null);
    dispatch(handleSession());
    navigate('/home');
  };

  return (
    <div className="form-wrap">
      {error && <small className="text-alert fs-5">{error}</small>}
      <h3>Log in</h3>
      <form onSubmit={handleLogin}>
        <label htmlFor="email" className="form-label">
          Email :
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="name-error"
          />
        </label>
        <label htmlFor="password">
          password :
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Your Username"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-describedby="name-error"
          />
        </label>
        <div className="link mt-2 d-flex justify-content-between w-100">

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>

          <Link to="/signup" className="btn text-light btn-secondary">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
