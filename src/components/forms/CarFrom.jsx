import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postCars } from 'redux/formSlice/carSlice';
import { Link, useNavigate } from 'react-router-dom';
import NotAdmin from 'components/NotAdmin';
import { getCars } from 'redux/cars/carsSlice';

const CarFrom = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.carForm);
  const isAdmin = JSON.parse(localStorage.getItem('user')).role === 1;
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCar = async (event) => {
    event.preventDefault();
    try {
      await dispatch(postCars({
        name, price, description, image, model,
      }));
      navigate('/home');
      dispatch(getCars());
    } catch (error) {
      setError(error.massage);
    }
  };

  if (!isAdmin) {
    return <NotAdmin />;
  }
  return (
    <div className="form-wrap">
      <h3>Add A Car</h3>
      <form onSubmit={handleCar}>
        {error && <p>{error}</p>}
        <label htmlFor="name" className="form-label">
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter the car name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="model" className="form-label">
          <input
            type="text"
            className="form-control"
            id="model"
            placeholder="Enter the model name"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </label>
        <label htmlFor="image" className="form-label">
          <input
            type="text"
            className="form-control"
            id="image"
            placeholder="Enter the car image link"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        <label htmlFor="price" className="form-label">
          <input
            type="number"
            className="form-control"
            id="price"
            placeholder="Enter the car price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label htmlFor="description" className="form-label">
          <textarea
            type="text"
            className="form-control"
            id="description"
            placeholder="Enter the car Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <div className="link mt-2 d-flex justify-content-between w-100">
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Car'}
          </button>
          <Link to="/cars" className="btn text-light btn-secondary">See Cars</Link>
        </div>
      </form>
    </div>
  );
};

export default CarFrom;
