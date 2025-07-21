import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: true,
    user: null,
    userProfile: null,
  },
  reducers: {
    setLoading: (state, actions) => {
      state.loading = actions.payload;
    },
    setUser: (state, actions) => {
      state.user = actions.payload;
      state.loading = false
    },
    setUserProfile: (state, actions) => {
      state.userProfile = actions.payload;
      state.loading = false
    },
  },
});

export const { setLoading, setUser, setUserProfile } = authSlice.actions;
export default authSlice.reducer;
