import React from 'react';
import PropTypes from 'prop-types';

const CarCard = ({ car: { fields: { name, image } } }) => (
  <div className="col">
    <div className="card">
      <img src={image[0].url} className="card-img-top" height="200px" width="100%" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">this is for the description of the car</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">reservations date</li>
        <li className="list-group-item">returning date</li>
        <li className="list-group-item">city of reservations</li>
      </ul>
      <div className="card-footer bg-secondary">
        <span className="badge bg-light text-dark">Cancel Reservations</span>
      </div>
    </div>
  </div>
);

CarCard.propTypes = {
  car: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default CarCard;
