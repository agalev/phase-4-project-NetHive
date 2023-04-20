import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    initialimage: null,
    displayMessages: null
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
    setLoggedUserFirstName: (state, action) => {
      state.user = { ...state.user, first_name: action.payload };
    },
    setLoggedUserLastName: (state, action) => {
      state.user = { ...state.user, last_name: action.payload };
    },
    setLoggedUserEmail: (state, action) => {
      state.user = { ...state.user, email: action.payload };
    },
    setDisplayMessages: (state, action) => {
      state.displayMessages = action.payload
    },
    setLoggedUserRooms: (state, action) => {
      state.user = { ...state.user, rooms: action.payload}
    }
  }
});

export const { login, logout, setLoggedUserImage, setInitalImage, setLoggedUserEmail, setLoggedUserFirstName, setLoggedUserLastName, setDisplayMessages, setLoggedUserRooms } = userSlice.actions;

export default userSlice.reducer;