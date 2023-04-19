import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    initialimage: null
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setInitalImage: (state, action) => {
      state.initialimage = action.payload
    },
    setLoggedUserImage: (state, action) => {
      state.user = { ...state.user, image: action.payload };
    },
  }
});

export const { login, logout, setLoggedUserImage, setInitalImage } = userSlice.actions;

export default userSlice.reducer;