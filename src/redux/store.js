import { configureStore } from '@reduxjs/toolkit';
import classesReducer from './classes/classesSlice';
import sessionReducer from './session/sessionSlice';

const store = configureStore({
  reducer: {
    session: sessionReducer,
    classes: classesReducer,
  },
});

export default store;
