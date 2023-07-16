import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './cars/carsSlice';
import sessionReducer from './session/sessionSlice';
import carFormReducer from './formSlice/carSlice';

const store = configureStore({
  reducer: {
    session: sessionReducer,
    cars: carsReducer,
    carForm: carFormReducer,
  },
});

export default store;
