const { createAsyncThunk, createSlice } = require('@reduxjs/toolkit');

const urlSignUp = 'https://booking-app-api-lmvm.onrender.com/users';
// const urlSignUp = 'http://localhost3000/users/'; //turn on this comment to test in local backend repo and off the above

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
