import { createAsyncThunk } from "@reduxjs/toolkit";
import { signUpRequest } from "../../api/authApi";

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
