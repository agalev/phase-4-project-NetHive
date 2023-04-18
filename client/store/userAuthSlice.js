import { createSlice } from '@reduxjs/toolkit'

const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState: {
    isAuthenticated: false,
    userId: null,
  },
  reducers: {
    loginUser: (state, action) => {
      state.isAuthenticated = true
      state.userId = action.payload
    },
    logoutUser: (state) => {
      state.isAuthenticated = false
      state.userId = null
    },
  },
})

export const { loginUser, logoutUser } = userAuthSlice.actions

export const selectIsAuthenticated = (state) => state.userAuth.isAuthenticated
export const selectUserId = (state) => state.userAuth.userId

export default userAuthSlice.reducer
