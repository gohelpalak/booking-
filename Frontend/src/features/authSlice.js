import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import authService from '../services/authService';

const initialState= {
    user: JSON.parse(localStorage.getItem("user"))|| null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
};

// export const loginUser = createAsyncThunk("auth/loginUser",async(user,thunkAPI) => {