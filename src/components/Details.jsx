import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import '../styles/Detail.css';
import '../styles/Button.css';
import { useDispatch } from 'react-redux';
import { selectCar } from 'redux/cars/carsSlice';

const Details = ({ detail }) => {
  const dispatch = useDispatch();
  return (
    <main className="details-page">
      <div className="image-wrap">
        <img src={detail.image} alt={detail.name} />
      </div>
      <div className="text-section">
        <div className="up">
          <h3>{detail.name}</h3>
          <p className="text-muted">{detail.description}</p>
          <ul className="detail-list">
            <li>
              <span>Model:</span>
              {' '}
              <span>{detail.model}</span>
            </li>
            <li>
              <span>Price:</span>
              {' '}
              <span>
                $
                {detail.price}
              </span>
            </li>
          </ul>
        </div>
        <NavLink to="/make-reservations" className="btn-link">
          <button type="button" className="btn reserve-btn" onClick={() => dispatch(selectCar(detail))}>Reserve</button>
        </NavLink>
      </div>
    </main>
  );
};

Details.propTypes = {
  detail: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Details;
