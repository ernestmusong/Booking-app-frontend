import React from 'react';
import { deleteCar } from 'redux/formSlice/deleteSlice';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

const CarToDelete = ({ car }) => {
  const dispatch = useDispatch();
  const { message } = useSelector((store) => store.deleteCar);
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.role === 1;
  return (
    <tr>
      {/* <th className="p-2 text-center" scope="row">{index + 1}</th> */}
      <td className="p-2 text-start">{car.model}</td>
      <td className="p-2 text-start">{car.name}</td>
      <td className="p-2 text-start">{car.description}</td>
      {isAdmin && (
      <td className="p-2 text-center">
        <button
          id="deleteButton"
          type="button"
          className="badge bg-secondary w-75 p-2"
          onClick={() => {
            dispatch(deleteCar(car.id));
          }}
        >
          {message}
        </button>
      </td>
      )}
    </tr>
  );
};

CarToDelete.propTypes = {
  car: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default CarToDelete;
