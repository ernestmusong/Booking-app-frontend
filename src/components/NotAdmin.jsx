import React from 'react';
import { useNavigate } from 'react-router';

const NotAdmin = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  };
  return (
    <div className="card mx-auto mt-5" style={{ maxWidth: '500px' }}>
      <div className="card-header bg-danger">
        <h1 className="fs-3 text-light">Not Allowed</h1>
      </div>
      <div className="card-body">
        <h5 className="card-title">You are not Admin 🚫🚫</h5>
        <p className="card-text">Please log out and Sign in As admin</p>
        <button type="button" className="btn" onClick={() => logout()}> Log out</button>
      </div>
      <div className="card-footer">Restricted Area</div>
    </div>
  );
};

export default NotAdmin;
