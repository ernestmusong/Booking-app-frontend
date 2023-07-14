import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from 'redux/session/sessionSlice';

const Login = () => {
  const { loading } = useSelector((store) => store.session);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
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
      <h3>Log in</h3>
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
        {error && <p className="error-message" id="name-error">{error}</p>}

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
