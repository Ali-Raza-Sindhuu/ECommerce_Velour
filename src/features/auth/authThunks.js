import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginRequest, signUpRequest } from "../../api/authApi";

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (userData, thunkAPI) => {
    try {
      const response = await signUpRequest(userData);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Something went wrong",
        },
      );
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await loginRequest(userData);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Something went wrong",
        }
      );
    }
  }
);
