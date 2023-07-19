const { createAsyncThunk, createSlice } = require('@reduxjs/toolkit');

const urlSignUp = 'http://localhost:3000/users';
const urlLogin = 'http://localhost:3000/users/sign_in';
const urlLogout = 'http://localhost:3000/users/sign_out';

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
    localStorage.setItem('authToken', authToken);
    return { data, authToken };
  } catch (error) {
    return { error: 'Something went wrong!' };
  }
});

export const logout = createAsyncThunk('session/logout', async () => {
  try {
    const authToken = localStorage.getItem('authToken');
    const response = await fetch(urlLogout, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData };
    }
    localStorage.removeItem('authToken');
    return {};
  } catch (error) {
    return { error: 'Something went wrong!' };
  }
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
    builder.addCase(login.rejected, (state) => ({
      ...state,
      loading: false,
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
