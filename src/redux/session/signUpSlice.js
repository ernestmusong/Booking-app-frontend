const { createAsyncThunk, createSlice } = require('@reduxjs/toolkit');

const urlSignUp = 'http://localhost:3000/users';
// const urlLogout = 'http://localhost:3000/users/sign_out';

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
  isSignIn: false,
  loading: false,
  isAdmin: false,
};

const signUpSlice = createSlice({
  name: 'sign up',
  initialState,

  reducers: {

  },
  extraReducers: (builder) => {
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

export default signUpSlice.reducer;
