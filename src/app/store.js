import { configureStore } from '@reduxjs/toolkit'
import updateReducer from '../component/userSlice';

export default configureStore({
  reducer: {
    update: updateReducer,
  },
})