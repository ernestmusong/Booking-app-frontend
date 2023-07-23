import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CarCard from './CarCard';

const MyReservations = () => {
  const { cars: { cars }, reservation: { reserve } } = useSelector((store) => store);
  const carData = reserve.map((res) => {
    const reserveCars = cars.find((car) => car.id === res.id);
    if (reserveCars) {
      return {
        ...reserveCars,
        reservationDate: res.reservation_date,
        returningDate: res.returning_date,
        city: res.city,
      };
    }
    return reserveCars || [];
  });
  const reserveComponents = carData.map((car) => (
    <CarCard
      car={car}
      reservation={reserve}
      key={car.id}
    />
  ));
  if (!carData.length) {
    return (
      <div className="card w-50 m-auto mt-5">
        <div className="card-body">
          <h5 className="card-title">No Reservations At The Moment</h5>
          <p className="card-text">Please make Reservations by Feeling Form</p>
          <div className="card-footer d-flex justify-content-between">
            <Link to="/make-reservations">
              <button type="button" className="btn btn-primary">Fill Form</button>
            </Link>
            <Link to="/home">
              <button type="button" className="btn">See Cars</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="wrap">
      <h3 className="text-center fs-1 mt-5">
        Your Reservations
      </h3>
      <div className="row row-cols-1 row-cols-md-2 g-4 w-75 ms-auto me-5 mt-5">
        {reserveComponents}
      </div>
    </div>

  );
};

export default MyReservations;
