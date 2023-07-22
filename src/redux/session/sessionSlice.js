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
    localStorage.setItem('user', JSON.stringify(data));
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
        Authorization: `${authToken}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData };
    }
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    return {};
  } catch (error) {
    return error.message;
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

  if (!response.ok) {
    const errorData = await response.json();
    return { error: errorData };
  }

  const authToken = response.headers.get('Authorization');
  const data = await response.json();
  localStorage.setItem('authToken', authToken);
  localStorage.setItem('user', JSON.stringify(data));
  return data;
});

const initialState = {
  signUpData: JSON.parse(localStorage.getItem('user')) || null,
  isLoggedIn: !!localStorage.getItem('authToken'),
  loading: false,
  isAdmin: false,
  message: '',
  error: '',
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    handleSession: (state) => {
      const isLoggedIn = !!localStorage.getItem('authToken') || false;
      if (isLoggedIn) {
        const signUpData = JSON.parse(localStorage.getItem('user'));
        const isAdmin = signUpData.status.data.role === 1;
        return ({
          ...state,
          isLoggedIn,
          signUpData,
          isAdmin,
        });
      }
      return {
        ...state,
        isLoggedIn,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(login.fulfilled, (state, { payload }) => ({
      ...state,
      loading: false,
      signUpData: payload,
      message: payload.message,
    }));
    builder.addCase(login.rejected, (state) => ({
      ...state,
      loading: false,
      error: 'bad Request or server issue',
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
    builder.addCase(logout.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(logout.fulfilled, (state, { payload }) => ({
      ...state,
      loading: false,
      signUpData: payload,
      isSignIn: state.isSignIn ? false : state.isSignIn,
    }));
    builder.addCase(logout.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      signUpData: payload,
    }));
  },
});

export const { handleSession } = sessionSlice.actions;
export default sessionSlice.reducer;
