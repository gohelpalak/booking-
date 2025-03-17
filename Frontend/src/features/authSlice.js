import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';

const initialState = {
    // user: JSON.parse(localStorage.getItem("user")) || null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
};


export const registerUser = createAsyncThunk("auth/registerUser", async (userData, thunkAPI) => {
    try {
        return await authService.registerUser(userData);

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);

    }
});

export const loginUser = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
    try{
        return await authService.login(userData);
    }catch (error){
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
    
});

export const  logoutUser = createAsyncThunk('auth/logout',async()=>{
    authService.logout();
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    //   reset: (state) => {
    //     state.isLoading = false;
    //     state.isError = false;
    //     state.isSuccess = false;
    //     state.message = '';
    //   },
    },
    extraReducers: (builder) => {
      builder
        .addCase(registerUser.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
          localStorage.setItem('user', JSON.stringify(action.payload));
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(loginUser.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
          localStorage.setItem('user', JSON.stringify(action.payload));
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(logoutUser.fulfilled, (state) => {
          state.user = null;
          localStorage.removeItem('user');
        });
    },
  });
  
//   export const { reset } = authSlice.actions;
  export default authSlice.reducer;