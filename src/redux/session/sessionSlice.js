const { createAsyncThunk, createSlice } = require('@reduxjs/toolkit');

const url = 'api/v1/session';

export const login = createAsyncThunk('src/redux/session/sessionSlice"log"', async (user) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: user.name,
    }),
  });
  const data = await response.json();
  return data;
});

export const signUp = createAsyncThunk('src/redux/session/sessionSlice"sign"', async (user) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: user.name,
      email: user.email,
      password: user.password,
      confirmation_password: user.confirmPassword,
    }),
  });
  const data = await response.json();
  return data;
});

const initialState = {
  user: '',
  loading: false,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(login.fulfilled, (state) => ({
      ...state,
      loading: false,
    }));
    builder.addCase(login.rejected, (state) => ({
      ...state,
      loading: false,
    }));
  },
});

export const { log } = sessionSlice.actions;
export default sessionSlice.reducer;
