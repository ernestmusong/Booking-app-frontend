import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const baseURL = 'http://localhost:3000/api/';

export const postReservation = createAsyncThunk('', async (reserve) => {
  const response = await fetch(`${baseURL}user/${reserve.id}/reservations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: reserve.idUser, // it will get from hidden input of current user not reservation id
      car_id: reserve.idCar,
      city: reserve.city,
      reservation_date: reserve.reservation_date,
      returning_date: reserve.reservation_date,
    }),
  });
  const data = await response.json();
  return data;
});

const initialState = {
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
    builder.addCase(postReservation.fulfilled, (state) => ({
      ...state,
      isLoading: false,
    }));
    builder.addCase(postReservation.rejected, (state) => ({
      ...state,
      isLoading: false,
    }));
  },
});

export default reservationSlice.reducer;
