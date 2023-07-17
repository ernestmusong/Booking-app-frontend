import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const client = axios.create({
  baseURL: 'https://course-api.com',
});

export const getCars = createAsyncThunk(
  'cars/getCars',
  async (name, thunkAPI) => {
    try {
      const resp = await client.get('/javascript-store-products');
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  },
);

const initialState = {
  cars: [],
  isLoading: true,
  error: '',
  carSelected: false,
};

export const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducer: {
    selectCar: (state, action) => {
      const carSelected = action.payload;
      return {
        ...state,
        carSelected,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCars.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(getCars.fulfilled, (state, action) => ({
        ...state,
        cars: action.payload || [],
        isLoading: false,
      }))

      .addCase(getCars.rejected, (state) => ({
        ...state,
        isLoading: false,
        error: 'Something went wrong',
      }));
  },
});

export const { selectCar } = carsSlice.actions;
export default carsSlice.reducer;
