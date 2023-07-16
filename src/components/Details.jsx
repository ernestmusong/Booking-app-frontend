import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import '../styles/Detail.css';
import Button from './Button';

const Details = ({ detail }) => (
  <main className="details-page">
    <div className="image-wrap">
      <img src={detail.fields.image[0].url} alt={detail.fields.name} />
    </div>
    <div className="text-section">
      <div className="up">
        <h3>{detail.fields.name}</h3>
        <p className="text-muted">Ltatum soluta mollitia nostrum tempora eveniet aut, ratione.</p>
        <ul className="detail-list">
          <li>
            <span>Model:</span>
            {' '}
            <span>{detail.fields.price}</span>
          </li>
          <li>
            <span>Price:</span>
            {' '}
            <span>
              $
              {detail.fields.price}
            </span>
          </li>
        </ul>
      </div>
      <NavLink to="/reserve" className="btn-link">
        <Button text="Reserve" className="btn" />
      </NavLink>
    </div>
  </main>
);

Details.propTypes = {
  detail: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Details;
