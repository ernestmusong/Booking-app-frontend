import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = 'https://booking-app-api-lmvm.onrender.com/api/';
// const baseUrl = 'http://localhost3000/api/'; //turn on this comment to test in local backend repo and off the above

export const getCars = createAsyncThunk(
  'cars/getCars',
  async () => {
    const authToken = localStorage.getItem('authToken');
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${authToken}`,
      },
    };

    const resp = await fetch(`${baseUrl}cars`, requestOptions);
    const data = await resp.json();
    return data;
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
  reducers: {
    selectCar: (state, action) => {
      const carSelected = action.payload;
      const updatedCars = state.cars.map((car) => {
        if (car.id === action.payload.id) {
          return { ...car, reserved: true };
        }
        return car;
      });
      return {
        ...state,
        cars: updatedCars,
        carSelected,
      };
    },

    carRemove: (state, { payload }) => {
      const carFiltered = state.cars.filter((car) => car.id !== payload);
      return {
        ...state,
        cars: carFiltered,
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
        cars: action.payload.map((car) => ({ ...car, reserved: false })),
        isLoading: false,
      }))

      .addCase(getCars.rejected, (state) => ({
        ...state,
        isLoading: false,
        error: 'Something went wrong',
      }));
  },
});

export const { selectCar, carRemove } = carsSlice.actions;
export default carsSlice.reducer;
