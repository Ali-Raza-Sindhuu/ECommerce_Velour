import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser } from "./authThunks";

const initialState = {
    user : null,
    accessToken : null,
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


    //Sign Up logic and workflow
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


      //Login Logic and working flow
      .addCase(loginUser.pending, (state) => {
        state.loading = true,
        state.error = false
     })

     .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false,
        state.user = action.payload.data,
        state.accessToken = action.payload.accessToken,
        state.isAuthenticated = true;
     })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false,
        state.error = action.payload?.message
      })
  }
});

export default authSlice.reducer;