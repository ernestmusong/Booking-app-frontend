import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Button.css';

const Button = ({ text, className, fun }) => {
  return (
    <button type="button" className={className} onClick={fun}>{text}</button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  fun: PropTypes.func.isRequired,
};
export default Button;
