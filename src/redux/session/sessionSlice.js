const { createAsyncThunk, createSlice } = require('@reduxjs/toolkit');

const urlSignUp = 'http://localhost:3000/users';
const urlLogin = 'http://localhost:3000/users/sign_in';

export const login = createAsyncThunk('src/redux/session/sessionSlice"log"', async (user) => {
  const response = await fetch(urlLogin, {
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

export const signUp = createAsyncThunk('src/redux/session/sessionSlice/sign', async (users) => {
  const response = await fetch(urlSignUp, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        name: users.name,
        email: users.email,
        password: users.password,
      },
    }),
  });
  const data = await response.json();
  return data;
});

const initialState = {
  signUpData: null,
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
    builder.addCase(login.fulfilled, (state, { payload }) => ({
      ...state,
      loading: false,
      signUpData: payload,
    }));
    builder.addCase(login.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      signUpData: payload,
    }));
    builder.addCase(signUp.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(signUp.fulfilled, (state, { payload }) => ({
      ...state,
      loading: false,
      signUpData: payload,
    }));
    builder.addCase(signUp.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      signUpData: payload,
    }));
  },
});

export const { log } = sessionSlice.actions;
export default sessionSlice.reducer;
