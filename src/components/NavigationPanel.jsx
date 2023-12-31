import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import {
  FaTwitter, FaFacebookF, FaVimeoV, FaPinterestP,
} from 'react-icons/fa6';
import { TfiGoogle } from 'react-icons/tfi';
import logo from '../assets/Frame.png';
import MobileNavigation from './home/MobileNavigation';

const links = [
  { path: '/home', text: 'Cars' },
  { path: '/make-reservations', text: 'Reserve a car', id: 'border' },
  { path: '/my-reservations', text: 'My reservations' },
  { path: '/add-car', text: 'Add car' },
  { path: '/delete-car', text: 'Delete car' },
];
const currentYear = new Date().getFullYear();
const NavigationPanel = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  };
  return (
    <>
      <div className="navigation-panel">
        <nav className="navbar">
          <div className="logo-container">
            <img className="logo" src={logo} alt="logo" />
          </div>
          <ul>
            {links.map((link) => (
              <li key={link.text}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) => (isActive ? 'active' : 'normal')}
                  id={link.id}
                >
                  {link.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <footer>
          <div className="social-container">
            <div className="icons">
              <FaTwitter />
              <FaFacebookF />
              <TfiGoogle />
              <FaVimeoV />
              <FaPinterestP />
            </div>
            <p>
              ©
              {' '}
              {currentYear}
              {' '}
              All rights reserved
            </p>
          </div>
        </footer>
        <button type="button" className="btn" onClick={() => logout()}>Log out</button>
      </div>
      <MobileNavigation />
    </>
  );
};

export default NavigationPanel;
