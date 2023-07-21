import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const deleteCar = createAsyncThunk('cars/delete', async (id) => {
  const url = `http://localhost:3000/api/cars/${id}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log(data);
    return data;
    // Handle the response
  } catch (error) {
    // Handle the error
    return null;
  }
});

const initialState = {
  message: 'Delete',
};

const deleteSlice = createSlice({
  name: 'deleteCar',
  initialState,
  reducers: {
    removeItem: (state, { payload }) => ({
      ...state,
      products: [...state.products.filter((item) => item.id !== payload)],
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(deleteCar.pending, (state) => ({
      ...state,
      message: 'Deleting',
    }));
    builder.addCase(deleteCar.fulfilled, (state) => ({
      ...state,
      message: 'Removed!',
    }));
    builder.addCase(deleteCar.rejected, (state) => ({
      ...state,
      message: 'Delete',
    }));
  },
});

export default deleteSlice.reducer;
