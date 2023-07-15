import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './cars/carsSlice';
import sessionReducer from './session/sessionSlice';

const store = configureStore({
  reducer: {
    session: sessionReducer,
    cars: carsReducer,
  },
});

export default store;
