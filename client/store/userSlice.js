import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setLoggedUserImage: (state, action) => {
      state.user.image = action.payload;
    }
  }
});

export const { login, logout, setLoggedUserImage } = userSlice.actions;

export default userSlice.reducer;

