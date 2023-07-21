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
        Authorization: `${authToken}`,
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
  isSignIn: false,
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
      if (state.signUpData.data.status.message === 'Signed up successfully' || state.signUpData.data.status.message === 'User signed in successfully') {
        let isAdmin = false;
        if (state.status.data.role === 1) {
          isAdmin = true;
        }
        return ({
          ...state,
          isSignIn: true,
          isAdmin,
        });
      }
      throw {message: 'somthing went wrong'}; //eslint-disable-line
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
