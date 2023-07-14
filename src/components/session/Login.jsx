import React, { useState } from 'react'

const Login = () => {
  const [name, setName] = useState();
  const [error, setError] = useState(null);
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await dispatch(login({ name, password }));
      dispatch(addBook({ name, password }));
      setName('')
    } catch (error) {
      setError('Wrong Name please check');
    }
  };
  return (
    <form onSubmit={handleLogin}>
      {error && <p>{error}</p>}
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      {loading ? (
        <button type="submit" className="button add" disabled>login ....</button>
      ) : (
        <button type="submit" className="button add">log in</button>
      )}
    </form>
  )
}

export default Login

