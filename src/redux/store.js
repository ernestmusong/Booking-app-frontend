import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './cars/carsSlice';
import sessionReducer from './session/sessionSlice';
import carFormReducer from './formSlice/carSlice';

import reservationReducer from './reservations/carReserve';

const store = configureStore({
  reducer: {
    session: sessionReducer,
    cars: carsReducer,
    reservation: reservationReducer,
    carForm: carFormReducer,
  },
});

export default store;
