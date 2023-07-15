import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCars } from '../../redux/cars/carsSlice';
import Car from './Car';
import Title from './Tittle';

function CarList() {
  const dispatch = useDispatch();
  const { cars, isLoading, error } = useSelector((store) => store.cars);

  useEffect(() => {
    dispatch(getCars('CARS'));
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }
  if (error) {
    return (
      <div className="error">
        <h1>{error}</h1>
      </div>
    );
  }
  if (cars.length === 0) {
    return (
      <div className="empty list">
        <h1>Your cars list is currently empty!</h1>
      </div>
    );
  }
  return (
    <>
      <div className="classes-wrapper">
        <Title title="all cars" subTitle="Please select a car" />
        <div className="classes mx-auto">
          { cars.map((item) => <Car key={item.id} item={item} />)}
        </div>
      </div>
    </>
  );
}

export default CarList;