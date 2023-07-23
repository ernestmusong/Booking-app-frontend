import React from 'react';
import { useSelector } from 'react-redux';
import CarToDelete from './CarToDelete';
import NotAdmin from './NotAdmin';

const Delete = () => {
  const { cars } = useSelector((store) => store.cars);
  const isAdmin = JSON.parse(localStorage.getItem('user')).role === 1;

  if (!isAdmin) {
    return <NotAdmin />;
  }

  return (
    <div className="container-fluid d-flex align-items-center gap-5 flex-column mt-5">
      <h3 className="fs-1">Available Cars</h3>
      <table className="table w-50 table-striped table-hover border rounded-3 p-5 mb-5">
        <thead>
          <tr>
            <th className="text-centre" scope="col">Model</th>
            <th className="text-centre" scope="col">Name</th>
            <th className="text-centre" scope="col">Description</th>
            <th className="text-centre" scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => <CarToDelete key={car.id} car={car} />)}
        </tbody>
      </table>
    </div>
  );
};

export default Delete;
