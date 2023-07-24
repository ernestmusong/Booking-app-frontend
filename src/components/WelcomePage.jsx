import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Welcome.css';

const WelcomePage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div id="splash_screen">
      <div className="splash_text_wrap">
        <h1>Welcome!</h1>
      </div>
      <div className="splash_btn_wrap">
        <NavLink to={user ? '/home' : '/login'} className="splash_btn" id="login"> Login</NavLink>
        <NavLink to={user ? '/home' : '/signup'} className="splash_btn" id="signup">Sign up</NavLink>
      </div>
    </div>
  );
}

export default WelcomePage;
