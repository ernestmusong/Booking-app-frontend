import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from 'redux/session/loginSlice';

const Login = () => {
  const { message } = useSelector((store) => store.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(null);

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login({ email, password })).then(() => {
      if (localStorage.getItem('user')) {
        navigate('/home');
      } else {
        setEmail('');
        setPassword('');
        navigate('/login');
      }
    });
    setAlert(null);
  };

  return (
    <div className="form-wrap">
      {alert && <small className="text-alert fs-5">{alert}</small>}
      {alert && <small className="text-alert fs-5">{message}</small>}
      <h3>Log in</h3>
      <form onSubmit={handleLogin}>
        <label htmlFor="email" className="form-label">
          Email :
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="name-error"
            required
          />
        </label>
        <label htmlFor="password">
          password :
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-describedby="name-error"
            required
          />
        </label>
        <div className="link mt-2 d-flex justify-content-between w-100">
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
          <Link to="/signup" className="btn text-light btn-secondary">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
