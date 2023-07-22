import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Default = () => {
  const { message, error, isLoggedIn } = useSelector((store) => store.session);
  return (
    <div className="text-center">
      <h1 className="fs-1 text-center">404</h1>
      <p className="text-center">Either not logged in or you are lost</p>
      <div className="text-center">
        <Link to={isLoggedIn ? '/home' : '/'}>back to home</Link>
      </div>
      <p>
        Errors :
        {message}
        {error}
      </p>
    </div>
  );
};

export default Default;
