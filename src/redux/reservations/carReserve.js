import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const baseUrl = 'https://booking-app-api-lmvm.onrender.com/api/';
// const baseUrl = 'http://localhost3000/api/'; //turn on this comment to test in local backend repo and off the above

export const postReservation = createAsyncThunk('car/reservations', async (reserve) => {
  const authToken = localStorage.getItem('authToken');
  const response = await fetch(`${baseUrl}users/${reserve.id}/reservations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${authToken}`,
    },
    body: JSON.stringify({
      user_id: reserve.id,
      city: reserve.city,
      reservation_date: reserve.reservationDate,
      returning_date: reserve.returningDate,
      car_id: reserve.carId,
    }),
  });
  const data = await response.json();
  return data;
});

export const getReservations = createAsyncThunk(
  'cars/reservations',
  async () => {
    const authToken = localStorage.getItem('authToken');
    const user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${authToken}`,
      },
    };

    const resp = await fetch(`${baseUrl}/users/${user.id}/reservations`, requestOptions);
    const data = await resp.json();
    return data;
  },
);

export const cancelReservations = createAsyncThunk('reservations/cancel', async (id) => {
  const authToken = localStorage.getItem('authToken');
  const user = JSON.parse(localStorage.getItem('user'));
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${authToken}`,
    },
  };

  const resp = await fetch(`${baseUrl}users/${user.id}/reservations/${id}`, requestOptions);
  const data = await resp.json();
  return data;
});

const initialState = {
  reserve: [],
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
    builder.addCase(getReservations.pending, (state) => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(getReservations.fulfilled, (state, { payload }) => ({
      ...state,
      isLoading: false,
      reserve: payload,
    }));
    builder.addCase(getReservations.rejected, (state) => ({
      ...state,
      isLoading: false,
    }));
  },
});

export default reservationSlice.reducer;
