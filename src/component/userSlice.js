import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'update',
  initialState: {
    user: null,
    keyword: ''
  },
  reducers: {
    setUser: (state, data) => {
      state.user = data.payload
    },
    setKeyword: (state, data) => {
      state.keyword = data.payload
    }
  },
})

export const { setUser, setKeyword } = userSlice.actions

export const getUser = (state) => state.update.user
export const getKeyword = (state) => state.update.keyword

export default userSlice.reducer