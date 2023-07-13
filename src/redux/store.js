import { configureStore } from '@reduxjs/toolkit';
import classesReducer from './classes/classesSlice';

const store = configureStore({
  reducer: {
    classes: classesReducer,
  },
});

export default store;
