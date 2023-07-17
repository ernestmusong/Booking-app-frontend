import React from 'react';
import { useSelector } from 'react-redux';
import { ProgressBar } from 'react-loader-spinner';
import Car from './Car';
import Title from './Tittle';

function CarList() {
  const { cars, isLoading, error } = useSelector((store) => store.cars);

  if (isLoading) {
    return (
      <div className="loading">
        <ProgressBar
          height="100"
          width="200"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass="progress-bar-wrapper"
          borderColor="#F4442E"
          barColor="limegreen"
        />
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
          {cars.map((item) => <Car key={item.id} item={item} />)}
        </div>
      </div>
    </>
  );
}

export default CarList;
