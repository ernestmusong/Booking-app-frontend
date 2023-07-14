import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const client = axios.create({
  baseURL: 'https://financialmodelingprep.com',
});

export const getClasses = createAsyncThunk(
  'classes/getClasses',
  async (name, thunkAPI) => {
    try {
      const resp = await client.get('/api/v1/classes');
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  },
);

const initialState = {
  classes: [],
  isLoading: true,
  error: '',
};

export const classesSlice = createSlice({
  name: 'classes',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getClasses.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(getClasses.fulfilled, (state, action) => ({
        ...state,
        classes: action.payload || [],
        isLoading: false,
      }))

      .addCase(getClasses.rejected, (state) => ({
        ...state,
        isLoading: false,
        error: 'Something went wrong',
      }));
  },
});

export default classesSlice.reducer;
