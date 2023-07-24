const { createAsyncThunk, createSlice } = require('@reduxjs/toolkit');

const urlLogin = 'https://booking-app-api-lmvm.onrender.com/users/sign_in';
// const urlLogin = 'http://localhost3000/users/sign_in/'; //turn on this comment to test in local backend repo and off the above

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
      const contentType = response.headers.get('content-type');
      let errorData = '';
      if (contentType && contentType.includes('application/json')) {
        errorData = await response.json();
      } else {
        errorData = { status: { message: await response.text() } };
      }
      return { data: errorData };
    }

    const data = await response.json();
    const authToken = response.headers.get('Authorization');
    const user = data.status.data;
    if (authToken) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('authToken', authToken);
    }
    return { data };
  } catch (error) {
    return { error: 'Something went wrong!' };
  }
});

const initialState = {
  loading: false,
  isAdmin: false,
  message: '',
  error: '',
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(login.fulfilled, (state, { payload }) => ({
      ...state,
      loading: false,
      message: payload.data.status.message,
    }));
    builder.addCase(login.rejected, (state, { error }) => ({
      ...state,
      loading: false,
      error: error.message || 'Something went wrong!',
    }));
  },
});

export default loginSlice.reducer;
