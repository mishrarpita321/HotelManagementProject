import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import adminConfig from 'src/config/adminConfig'

// ** Fetch Categories
export const fetchAdminRoomsList = createAsyncThunk('appAdminRooms/fetchData', async params => {
  const data = [];
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + window.localStorage.getItem(adminConfig.storageTokenKeyName)
  }

  // axios.get(adminConfig.AdminListEndpoint, params, { headers: headers })

  // const filterParams = "?" + (params.name ? 'name=' + params.name : '') + (params.role ? '&role=' + params.role : '') + (params.currentPlan ? '&currentPlan=' + params.currentPlan : '') + (params.status ? '&status=' + params.status : '')
  const filterParams = ''

  const response = await axios.get(adminConfig.adminRoomsGetAllEndpoint + '?isActive=true', { headers })
  return {
    adminRooms: response.data,
  };
})

// ** Add Categories
export const addAdminRooms = createAsyncThunk('appAdminRooms/addData', async (data, { getState, dispatch }) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',

    Authorization: 'Bearer ' + window.localStorage.getItem(adminConfig.storageTokenKeyName)
  }
  let returnResponse = null
  let categoryId = data.get('categoryId')
  data.delete('categoryId')
  // console.log(data.get('categoryId'))

  try {
    const response = await axios.post(adminConfig.adminAddRoomEndpoint + '/' + categoryId, data, { headers })
    dispatch(fetchAdminRoomsList(getState().adminRoom))
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
export const editAdminRooms = createAsyncThunk('appAdminRooms/editData', async (data, { getState, dispatch }) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + window.localStorage.getItem(adminConfig.storageTokenKeyName)
  }
  if (data.get('image') == 'undefined') {
    data.delete('image')
  }

  let id = data.get('id')
  let returnResponse = null
  let categoryId = data.get('categoryId')
  data.delete('categoryId')
  data.delete('id')

  // console.log(data.)

  try {
    const response = await axios.patch(adminConfig.adminEditRoomEndpoint + '/' + id + '/category?categoryId=' + categoryId, data, { headers })
    dispatch(fetchAdminRoomsList(getState().adminRoom))
    returnResponse = { 'status': 'success', 'message': 'Room Updated Successfully.' }
  } catch (e) {
    returnResponse = {
      'status': 'failed',
      'message': (typeof (e?.response?.data?.message) != undefined ? (e?.response?.data?.message) : ('Something went wrong'))
    }
  }
  return returnResponse
})

// ** Delete Category
export const deleteAdminRooms = createAsyncThunk('appAdminRooms/deleteData', async (id, { getState, dispatch }) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',

    Authorization: 'Bearer ' + window.localStorage.getItem(adminConfig.storageTokenKeyName)
  }
  let returnResponse = null
  try {
    const response = await axios.delete(adminConfig.adminDeleteRoomEndpoint + '/' + id, { headers })
    dispatch(fetchAdminRoomsList(getState().adminRoom))
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

export const appAdminRoomsSlice = createSlice({
  name: 'appAdminRooms',
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAdminRoomsList.fulfilled, (state, action) => {
      state.data = action.payload.adminRooms
    })
  }
})

export default appAdminRoomsSlice.reducer
