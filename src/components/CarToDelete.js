import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Button.css';

const CarToDelete = ({ car }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.role === 1;
  let text = 'Delete';
  const handleDelete = async (id) => {
    const url = `http://localhost:3000/api/cars/${id}`;
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
      if (data.msg === 'Car deleted successfully') {
        return 'Removed!';
      }
      console.log(data);
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
