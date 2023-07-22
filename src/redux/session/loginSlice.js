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

      const authToken = resp.headers.get('Authorization');
      const user = resp.data;
      if (authToken) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('authToken', authToken);
      }
      console.log(resp.data);
      console.log(authToken);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  },
);

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
