import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './cars/carsSlice';
import loginReducer from './session/loginSlice';
import signUpReducer from './session/signUpSlice';
import carFormReducer from './formSlice/carSlice';

import reservationReducer from './reservations/carReserve';

const store = configureStore({
  reducer: {
    login: loginReducer,
    signUp: signUpReducer,
    cars: carsReducer,
    reservation: reservationReducer,
    carForm: carFormReducer,
  },
});

export default store;
