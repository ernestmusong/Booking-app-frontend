import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const baseURL = 'http://localhost:3000/api/';

export const postReservation = createAsyncThunk('car/reservations', async (reserve) => {
  console.log(reserve);
  const authToken = localStorage.getItem('authToken');
  const response = await fetch(`${baseURL}users/${reserve.id}/reservations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${authToken}`,
    },
    body: JSON.stringify({
      car_id: reserve.carID,
      city: reserve.city,
      reservation_date: reserve.reservationDate,
      returning_date: reserve.returningDate,
    }),
  });
  const data = await response.json();
  return data;
});

const initialState = {
  data: null,
  isLoading: false,
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(postReservation.pending, (state) => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(postReservation.fulfilled, (state, { payload }) => ({
      ...state,
      isLoading: false,
      data: payload,
    }));
    builder.addCase(postReservation.rejected, (state) => ({
      ...state,
      isLoading: false,
    }));
  },
});

export default reservationSlice.reducer;
