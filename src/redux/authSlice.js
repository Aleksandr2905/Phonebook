import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const $instance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com/',
});

export const setToken = token => {
  $instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const requestRegister = createAsyncThunk(
  'auth/requestRegister',
  async (formData, thunkAPI) => {
    try {
      const { data } = await $instance.post('/users/signup', formData);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const requestLogIn = createAsyncThunk(
  'auth/requestLogIn',
  async (formDataLogIn, thunkAPI) => {
    try {
      const { data } = await $instance.post('/users/login', formDataLogIn);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const requestAutoLogIn = createAsyncThunk(
  'auth/requestAutoLogIn',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      setToken(token);
      const { data } = await $instance.get('/users/current');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const token = thunkAPI.getState().auth.token;
      if (token) {
        return true;
      }
      return false;
    },
  }
);

export const requestLogOut = createAsyncThunk(
  'auth/requestLogOut',
  async (_, thunkAPI) => {
    try {
      const { data } = await $instance.post('/users/logout');
      setToken('');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  token: null,
  userData: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(requestRegister.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.userData = action.payload.user;
      })
      .addCase(requestRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(requestLogIn.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestLogIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.userData = action.payload.user;
      })
      .addCase(requestLogIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(requestAutoLogIn.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestAutoLogIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.userData = action.payload;
      })
      .addCase(requestAutoLogIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(requestLogOut.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestLogOut.fulfilled, (state, action) => {
        return initialState;
      })
      .addCase(requestLogOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const authReducer = authSlice.reducer;
