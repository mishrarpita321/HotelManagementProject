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
  let email = data.email
  let guests = data.guestRows
  let arrivalDate = formatDateforApi(data.arrival)
  let departureDate = formatDateforApi(data.departure)
  let numberOfGuests = data.size
  let parkingList = data.parkingRows
  let paymentType = "card"

  let finaldata = JSON.stringify({
    email,
    guests,
    arrivalDate,
    departureDate,
    numberOfGuests,
    parkingList,
    paymentType
  })
  console.log(data)
  // let categoryId = data.get('categoryId')
  // data.delete('categoryId')
  // console.log(data.get('categoryId'))
  // return

  try {
    // const response = await axios.post(adminConfig.adminAddBookingEndpoint + rooms.join(","), { email, guests, arrivalDate, departureDate, numberOfGuests, parkingList, paymentType }, { headers })
    const response = await axios.post(adminConfig.adminAddBookingEndpoint + rooms.join(","), finaldata, { headers })
    dispatch(fetchAdminBookingList(getState().adminBooking))
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
export const editAdminBooking = createAsyncThunk('appAdminBooking/editData', async (data, { getState, dispatch }) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + window.localStorage.getItem(adminConfig.storageTokenKeyName)
  }
  let returnResponse = null
  let id = data.id
  console.log(data.arrivalDate)
  // return
  let roomslist = (data?.rooms)
  // let id= data?.id
  let arrivalDate = formatDateforApi(data.arrival)
  let departureDate = formatDateforApi(data.departure)
  console.log(arrivalDate)


  let parkingList = data.parkingRows

  let finaldata = JSON.stringify({
    arrivalDate,
    departureDate,
    parkingList,
  })

  console.log(finaldata)

  try {
    const response = await axios.patch(adminConfig.adminEditBookingEndpoint + '/' + id + '?roomNumbers=' + roomslist.join(","), finaldata, { headers })
    dispatch(fetchAdminBookingList(getState().adminRoom))
    returnResponse = { 'status': 'success', 'message': 'Booking Updated Successfully.' }
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
export const deleteAdminBooking = createAsyncThunk('appAdminBooking/deleteData', async (id, { getState, dispatch }) => {
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

function getRoomNumbers(rooms) {
  return rooms
    .map((room) => `${room.roomNo}`)
    .join(",");
}

export const checkoutAdminBooking = createAsyncThunk('appAdminBooking/checkoutData', async (data, { getState, dispatch }) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + window.localStorage.getItem(adminConfig.storageTokenKeyName)
  }
  let returnResponse = null

  console.log(data)
  let rooms = getRoomNumbers(data.rooms)

  let apidata = JSON.stringify({
    username: data.email,
    bookingId: data.id,
    arrivalDate: formatDateforApi(data.arrivalDate),
    deptDate: formatDateforApi(data.departureDate),
    finalCost:data.totalCost
  })
  // console.log(rooms)
  // return
  try {
    const response = await axios.post(adminConfig.adminCheckoutBookingEndpoint + rooms, apidata, { headers })
    dispatch(fetchAdminBookingList(getState().adminRoom))
    returnResponse = { 'status': 'success', 'message': 'Room Checkout Successfull.' }
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
