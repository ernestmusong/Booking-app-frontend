import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'redux/session/sessionSlice';

const Login = () => {
  const { loading } = useSelector((store) => store.session);
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [error, setError] = useState(null);
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await dispatch(login({ name }));
      setName('');
    } catch (error) {
      setError('Wrong Name please check');
    }
  };
  return (
    <form onSubmit={handleLogin}>
      {error && <p>{error}</p>}
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      {loading ? (
        <button type="submit" className="button log" disabled>login ....</button>
      ) : (
        <button type="submit" className="button log">log in</button>
      )}
    </form>
  );
};

export default Login;
