import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Details from './Details';

const DetailsContainer = () => {
  const { id } = useParams();
  const { cars } = useSelector((store) => store.cars);
  const detail = cars.find((item) => item.id.toString() === id.toString());
  return (
    <main data-testid="statement-detail-page">
      <Details detail={detail} />
      ;
    </main>
  );
}

export default DetailsContainer;
