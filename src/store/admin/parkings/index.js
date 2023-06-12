import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import adminConfig from 'src/config/adminConfig'

// ** Fetch Categories
export const fetchAdminParkingList = createAsyncThunk('appAdminParking/fetchData', async params => {
  const data = [];
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + window.localStorage.getItem(adminConfig.storageTokenKeyName)
  }

  // axios.get(adminConfig.AdminListEndpoint, params, { headers: headers })

  // const filterParams = "?" + (params.name ? 'name=' + params.name : '') + (params.role ? '&role=' + params.role : '') + (params.currentPlan ? '&currentPlan=' + params.currentPlan : '') + (params.status ? '&status=' + params.status : '')
  const filterParams = ''

  const response = await axios.get(adminConfig.adminParkingGetAllEndpoint, { headers })
  return {
    adminParkings: response.data,
  };
})

// ** Add Categories
export const addAdminParkings = createAsyncThunk('appAdminParking/addData', async (data, { getState, dispatch }) => {
  const headers = {
    Accept: 'application/json',
    // 'Content-Type': 'multipart/form-data',
    'Content-Type': 'application/json',

    Authorization: 'Bearer ' + window.localStorage.getItem(adminConfig.storageTokenKeyName)
  }
  let returnResponse = null

  // console.log(data)
  // let categoryId = data.get('categoryId')
  // data.delete('categoryId')
  // console.log(data.get('categoryId'))

  try {
    const response = await axios.post(adminConfig.adminAddParkingEndpoint, data, { headers })
    dispatch(fetchAdminParkingList(getState().adminRoom))
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

export const appAdminParkingsSlice = createSlice({
  name: 'appAdminParkings',
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAdminParkingList.fulfilled, (state, action) => {
      state.data = action.payload.adminParkings
    })
  }
})

export default appAdminParkingsSlice.reducer
