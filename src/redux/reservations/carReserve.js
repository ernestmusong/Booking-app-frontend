import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const baseURL = 'http://localhost:3000/api/';
const user = JSON.parse(localStorage.getItem('user'));
const userId = user.id;
export const postReservation = createAsyncThunk('car/reservations', async (reserve) => {
  const authToken = localStorage.getItem('authToken');
  const response = await fetch(`${baseURL}users/${userId}/reservations`, {
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
  data: {},
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
