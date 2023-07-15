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
};

export const carsSlice = createSlice({
  name: 'cars',
  initialState,
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

export default carsSlice.reducer;
