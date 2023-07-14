import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './session/sessionSlice';

const store = configureStore({
  reducer: {
    session: sessionReducer,
  },
});

export default store;
