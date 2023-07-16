import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const url = 'http://localhost:3000/api/cars/';

export const postCars = createAsyncThunk('fromSlice/postCars', async (car) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: car.name,
      image: car.image,
      model: car.model,
      price: car.price,
      description: car.description,
    }),
  });
  const data = await response.json();
  return data;
});

const initialState = {
  isLoading: false,
};

const carFormSlice = createSlice({
  name: 'carFromSlice',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(postCars.pending, (state) => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(postCars.fulfilled, (state) => ({
      ...state,
      isLoading: false,
    }));
    builder.addCase(postCars.rejected, (state) => ({
      ...state,
      isLoading: false,
    }));
  },
});

export default carFormSlice.reducer;
