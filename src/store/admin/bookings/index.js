import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import adminConfig from 'src/config/adminConfig'
import { formatDateforApi } from 'src/helper/get-date-format-for-api';

// ** Fetch Categories
export const fetchAdminBookingList = createAsyncThunk('appAdminBooking/fetchData', async params => {
  const data = [];
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + window.localStorage.getItem(adminConfig.storageTokenKeyName)
  }

  // axios.get(adminConfig.AdminListEndpoint, params, { headers: headers })

  // const filterParams = "?" + (params.name ? 'name=' + params.name : '') + (params.role ? '&role=' + params.role : '') + (params.currentPlan ? '&currentPlan=' + params.currentPlan : '') + (params.status ? '&status=' + params.status : '')
  const filterParams = ''

  const response = await axios.get(adminConfig.adminBookingGetAllEndpoint, { headers })
  return {
    adminBookings: response.data,
  };
})

// ** Add Categories
export const addAdminBooking = createAsyncThunk('appAdminBooking/addData', async (data, { getState, dispatch }) => {
  const headers = {
    Accept: 'application/json',
    // 'Content-Type': 'multipart/form-data',
    'Content-Type': 'application/json',

    Authorization: 'Bearer ' + window.localStorage.getItem(adminConfig.storageTokenKeyName)
  }
  let returnResponse = null

  let rooms = (data.selectedRoomList)
  let email = window.localStorage.getItem('userData').email
  let guests = data.guestsRows
  let arrivalDate = formatDateforApi(data.arrival)
  let departureDate = formatDateforApi(data.depature)
  let numberOfGuests = data.size
  let parkingList = data.parkingRows
  let paymentType = "card"
  // console.log(data)
  // let categoryId = data.get('categoryId')
  // data.delete('categoryId')
  // console.log(data.get('categoryId'))
  // return

  try {
    const response = await axios.post(adminConfig.adminAddBookingEndpoint + rooms.join(","), { rooms, email, guests, arrivalDate, departureDate, numberOfGuests, parkingList, paymentType }, { headers })
    dispatch(fetchAdminBookingList(getState().adminRoom))
    returnResponse = { 'status': 'success', 'message': response?.data }
  } catch (e) {
    // console.log(e)
    returnResponse = {
      'status': 'failed',
      'message': (typeof (e?.response?.data?.message) != undefined ? (e?.response?.data?.message) : ('Something went wrong'))
    }
  }
  return returnResponse
})
// ** Edit Categories
export const editAdminParkings = createAsyncThunk('appAdminParking/editData', async (data, { getState, dispatch }) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + window.localStorage.getItem(adminConfig.storageTokenKeyName)
  }
  console.log(data)

  let id = data.id
  // let id = data.get('id')
  let returnResponse = null
  // let categoryId = data.get('categoryId')
  // data.delete('categoryId')
  // data.delete('id')
  // let dataToSend = data.get('data')
  delete data.id
  console.log(data)

  try {
    const response = await axios.patch(adminConfig.adminEditParkingEndpoint + '/' + id, data, { headers })
    dispatch(fetchAdminParkingList(getState().adminRoom))
    returnResponse = { 'status': 'success', 'message': 'Room Updated Successfully.' }
  } catch (e) {
    console.log(e)
    returnResponse = {
      'status': 'failed',
      'message': (typeof (e?.response?.data?.message) != undefined ? (e?.response?.data?.message) : ('Something went wrong'))
    }
  }
  return returnResponse
})

// ** Delete Category
export const deleteAdminParkings = createAsyncThunk('appAdminParking/deleteData', async (id, { getState, dispatch }) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',

    Authorization: 'Bearer ' + window.localStorage.getItem(adminConfig.storageTokenKeyName)
  }
  let returnResponse = null
  try {
    const response = await axios.delete(adminConfig.adminDeleteParkingEndpoint + '/' + id, { headers })
    dispatch(fetchAdminParkingList(getState().adminRoom))
    returnResponse = { 'status': 'success', 'message': 'Room Deleted Successfully.' }
  } catch (e) {
    returnResponse = {
      'status': 'failed',
      'message': (typeof (e?.response?.data?.message) != undefined ? (e?.response?.data?.message) : ('Something went wrong'))
    }
  }
  return returnResponse
}
)

export const appAdminBookingsSlice = createSlice({
  name: 'appAdminBookings',
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAdminBookingList.fulfilled, (state, action) => {
      state.data = action.payload.adminBookings
    })
  }
})

export default appAdminBookingsSlice.reducer
