import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import adminConfig from 'src/config/adminConfig'
import userConfig from 'src/config/userConfig';
import { formatDateforApi } from 'src/helper/get-date-format-for-api';

// ** Fetch Categories
export const fetchUserBookingList = createAsyncThunk('appUserBooking/fetchData', async params => {
  const data = [];
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + window.localStorage.getItem(adminConfig.storageTokenKeyName)
  }

  // console.log('hihihihi')
  let email = JSON.parse(window.localStorage.getItem('userData')).email
  console.log(email)
  // axios.get(adminConfig.AdminListEndpoint, params, { headers: headers })

  // const filterParams = "?" + (params.name ? 'name=' + params.name : '') + (params.role ? '&role=' + params.role : '') + (params.currentPlan ? '&currentPlan=' + params.currentPlan : '') + (params.status ? '&status=' + params.status : '')
  const filterParams = ''

  const response = await axios.post(userConfig.userGetBookingsEndpoint, email, { headers })
  return {
    userBookings: response.data,
  };
})


// ** Delete Category
export const deleteUserBooking = createAsyncThunk('appUserBooking/deleteData', async (id, { getState, dispatch }) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',


    Authorization: 'Bearer ' + window.localStorage.getItem(adminConfig.storageTokenKeyName)
  }
  let returnResponse = null
  try {
    const response = await axios.delete(adminConfig.adminDeleteBookingEndpoint + '/' + id, { headers })
    dispatch(fetchAdminBookingList(getState().adminRoom))
    returnResponse = { 'status': 'success', 'message': 'Booking Deleted Successfully.' }
  } catch (e) {
    returnResponse = {
      'status': 'failed',
      'message': (typeof (e?.response?.data?.message) != undefined ? (e?.response?.data?.message) : ('Something went wrong'))
    }
  }
  return returnResponse
}
)

export const appUserBookingsSlice = createSlice({
  name: 'appUserBookings',
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUserBookingList.fulfilled, (state, action) => {
      state.data = action.payload.userBookings
    })
  }
})

export default appUserBookingsSlice.reducer
