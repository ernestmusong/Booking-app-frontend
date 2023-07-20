const { createAsyncThunk, createSlice } = require('@reduxjs/toolkit');

const urlLogin = 'http://localhost:3000/users/sign_in';
// const urlLogout = 'http://localhost:3000/users/sign_out';

export const login = createAsyncThunk('session/login', async (users) => {
  try {
    const response = await fetch(urlLogin, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: users.email,
          password: users.password,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData };
    }

    const data = await response.json();
    const authToken = response.headers.get('Authorization');
    const user = data.status.data;
    console.log(data.status.data);
    console.log(authToken);
    if (authToken) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('authToken', JSON.stringify(authToken));
    }
    return { data };
  } catch (error) {
    return { error: 'Something went wrong!' };
  }
});

const initialState = {
  isSignIn: false,
  loading: false,
  isAdmin: false,
  message: '',
  user: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,

  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(login.fulfilled, (state, { payload }) => ({
      ...state,
      loading: false,
      message: payload.data.status.message,
      user: payload,
      isSignIn: true,
    }));
    builder.addCase(login.rejected, (state) => ({
      ...state,
      loading: false,
      isSignIn: false,
    }));
  },
});

export default loginSlice.reducer;
