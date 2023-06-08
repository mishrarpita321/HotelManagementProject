// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
// import user from 'src/store/apps/user'
import category from 'src/store/admin/category'


export const store = configureStore({
  reducer: {
    category,

  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
