import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Home.css';
import {
  FaTwitter, FaFacebookF, FaVimeoV, FaPinterestP,
} from 'react-icons/fa6';
import { TfiGoogle } from 'react-icons/tfi';
import logo from '../assets/Frame.png';

const links = [
  { path: '/', text: 'Cars' },
  { path: '/make-reservations', text: 'Reserve a car', id: 'border' },
  { path: '/my-reservations', text: 'My reservations' },
  { path: '/add-car', text: 'Add car' },
  { path: '/delete', text: 'Delete car' },
];
const currentYear = new Date().getFullYear();
const NavigationPanel = () => (
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
    </div>
  </>
);

export default NavigationPanel;
