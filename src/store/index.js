// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
// import user from 'src/store/apps/user'
import category from 'src/store/admin/category'
import adminRoom from 'src/store/admin/rooms'


export const store = configureStore({
  reducer: {
    category,
    adminRoom,

  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
