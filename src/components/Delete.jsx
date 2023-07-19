import React from 'react';
import { useSelector } from 'react-redux';

const Delete = () => {
  const { cars } = useSelector((store) => store.cars);
  return (
    <div className="container-fluid d-flex align-items-center gap-5 flex-column mt-5">
      <h3 className="fs-1">Available Cars</h3>
      <table className="table w-50 table-striped table-hover border rounded-3 p-5 mb-5">
        <thead>
          <tr>
            <th className="text-centre" scope="col">S.no</th>
            <th className="text-centre" scope="col">Name</th>
            <th className="text-centre" scope="col">Description</th>
            <th className="text-centre" scope="col">Remove Button</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car, index) => (
            <tr key={car.id}>
              <th className="p-2 text-center" scope="row">{index + 1}</th>
              <td className="p-2 text-start">{car.fields.name}</td>
              <td className="p-2 text-start">{car.fields.description}</td>
              <td className="p-2 text-center"><span className="badge bg-secondary w-75 p-2">Remove</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Delete;
