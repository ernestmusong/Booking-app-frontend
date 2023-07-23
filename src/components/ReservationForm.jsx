import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postReservation } from 'redux/reservations/carReserve';
import { Link } from 'react-router-dom';

const ReservationForm = () => {
  const { reservation: { isLoading }, cars: { cars, carSelected } } = useSelector((store) => store);
  const user = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  const [city, setCity] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [returningDate, setReturningDate] = useState('');
  const [carId, setCarId] = useState('');
  const [error, setError] = useState('');
  const cities = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Philadelphia',
    'San Antonio',
    'San Diego',
    'Dallas',
    'San Jose',
  ];
  const handleReservation = async (event) => {
    event.preventDefault();
    try {
      await dispatch(postReservation({
        id: user.id, carId, city, reservationDate, returningDate,
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
        <label htmlFor="name" className="form-label">
          Your Name
          <input type="text" id="name" value={user.name} className="form-control" />
        </label>
        <label className="form-label" htmlFor="city">
          Enter your city
          <select
            className="form-control"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">Select a Car</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
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
            value={!carSelected ? carId : carSelected.id}
            onChange={(e) => setCarId(e.target.value)}
          >
            <option value={!carSelected ? '' : carSelected.name}>Select a Car</option>
            {cars.map((car) => (
              <option key={car.id} value={car.id}>
                {car.name}
              </option>
            ))}
          </select>
        </label>

        <div className="link mt-2 d-flex justify-content-between w-100">
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'reservation...' : 'reserve'}
          </button>
          <Link to="/cars" className="btn btn-secondary">See Cars</Link>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
