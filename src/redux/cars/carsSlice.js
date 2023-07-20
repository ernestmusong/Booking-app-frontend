import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const url = 'http://localhost:3000/api/cars';

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

    const resp = await fetch(url, requestOptions);
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

export const { selectCar } = carsSlice.actions;
export default carsSlice.reducer;
