import { createSlice } from "@reduxjs/toolkit";
import { signupUser } from "./authThunks";

const initialState = {
    user : null,
    loading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {},

  extraReducers :(builder) => {
    builder

     .addCase(signupUser.pending, (state) => {
        state.loading = true,
        state.error = false
     })

     .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false,
        state.user = action.payload.data
     })

      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false,
        state.error = action.payload?.message
      })
  }
});

export default authSlice.reducer;