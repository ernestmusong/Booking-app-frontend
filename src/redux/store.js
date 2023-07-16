import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './cars/carsSlice';
import sessionReducer from './session/sessionSlice';

import reservationReducer from './reservations/carReserve';

const store = configureStore({
  reducer: {
    session: sessionReducer,
    cars: carsReducer,

    reservation: reservationReducer,
  },
});

export default store;
