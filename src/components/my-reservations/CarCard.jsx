import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { cancelReservations } from 'redux/reservations/carReserve';

const CarCard = ({
  car: {
    name, image, description, reservationDate, returningDate, city, id,
  },
}) => {
  const dispatch = useDispatch();
  return (
    <div className="col">
      <div className="card">
        <img src={image} className="card-img-top" height="200px" width="100%" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            reservations date:
            {' '}
            {reservationDate}
          </li>
          <li className="list-group-item">
            returning date:
            {' '}
            {returningDate}
          </li>
          <li className="list-group-item">
            city of reservations:
            {' '}
            {city}
          </li>
        </ul>
        <div className="card-footer bg-secondary">
          <button
            type="button"
            onClick={() => {
              dispatch(cancelReservations(id));
              window.location.reload();
            }}
            className="badge bg-light text-dark"
          >
            Cancel Reservations
          </button>
        </div>
      </div>
    </div>
  );
};

CarCard.propTypes = {
  car: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default CarCard;
