import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000',
});

export const login = createAsyncThunk(
  'session/login',
  async (email, password, thunkAPI) => {
    try {
      const resp = await client.post('/users/sign_in', {
        email, password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
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
    console.log(data.status.data);
    console.log(authToken);
    console.log(authToken);
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
    builder.addCase(login.rejected, (state) => ({
      ...state,
      loading: false,
      error: 'Something went wrong!',
    }));
  },
});

export default loginSlice.reducer;
