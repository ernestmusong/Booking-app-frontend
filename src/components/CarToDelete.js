import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Button.css';
import { useDispatch } from 'react-redux';
import { carRemove } from 'redux/cars/carsSlice';

const CarToDelete = ({ car }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  const isAdmin = user?.role === 1;
  let text = 'Delete';
  const handleDelete = async (id) => {
    const url = `https://booking-app-api-lmvm.onrender.com/api/cars/${id}`;
    // const url = `http://localhost3000/api/cars/${id}`;//turn on this comment to test in local backend repo and off the above

    const authToken = localStorage.getItem('authToken');
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${authToken}`,
        },
      });
      const data = await response.json();
      dispatch(carRemove(id));
      if (data.msg === 'Car deleted successfully') {
        return 'Removed!';
      }
      text = data;
      return data;
    } catch (error) {
      return null;
    }
  };
  return (
    <tr>
      <td className="p-2 text-start">{car.model}</td>
      <td className="p-2 text-start">{car.name}</td>
      <td className="p-2 text-start">{car.description}</td>
      {isAdmin && (
        <td className="p-2 text-center">
          <button
            id="deleteButton"
            type="button"
            className="btn"
            onClick={() => {
              handleDelete(car.id);
            }}
          >
            {text}
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
