import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postReservation } from 'redux/reservations/carReserve';
import { Link } from 'react-router-dom';

const ReservationForm = () => {
  const { reservation: { isLoading }, cars: { cars } } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [city, setCity] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [returningDate, setReturningDate] = useState('');
  const [carId, setCarId] = useState('');
  const [error, setError] = useState('');
  const handleReservation = async (event) => {
    event.preventDefault();
    try {
      await dispatch(postReservation({
        carId, city, reservationDate, returningDate,
      }));
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="form-wrap">
      <h3>Reserve A Car</h3>
      <form onSubmit={handleReservation}>
        {error && <p>{error}</p>}
        <label className="form-label" htmlFor="city">
          Enter your city
          <input
            className="form-control"
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter Your City"
          />
        </label>
        <label className="form-label" htmlFor="date">
          Reservation Date
          <input
            className="form-control"
            type="date"
            id="date"
            value={reservationDate}
            onChange={(e) => setReservationDate(e.target.value)}
          />
        </label>
        <label className="form-label" htmlFor="date-return">
          Date of Return
          <input
            className="form-control"
            type="date"
            id="date-return"
            value={returningDate}
            onChange={(e) => setReturningDate(e.target.value)}
          />
        </label>
        <label className="form-label" htmlFor="car">
          Select your car
          <select
            className="form-control"
            id="car"
            value={carId}
            onChange={(e) => setCarId(e.target.value)}
          >
            <option value="">Select a Car</option>
            {cars.map((car) => (
              <option key={car.id} value={car.id}>
                {car.fields.name}
              </option>
            ))}
          </select>
        </label>

        <div className="link mt-2 d-flex justify-content-between w-100">
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'reservation...' : 'reserve'}
          </button>
          <Link to="/cars" className="btn text-light btn-secondary">See Cars</Link>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
