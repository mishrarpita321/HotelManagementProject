import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import adminConfig from 'src/config/adminConfig'

// ** Fetch Categories
export const fetchCategoriesList = createAsyncThunk('appAdminCategories/fetchData', async params => {
  const data = [];
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + window.localStorage.getItem(adminConfig.storageTokenKeyName)
  }

  // axios.get(adminConfig.AdminListEndpoint, params, { headers: headers })

  // const filterParams = "?" + (params.name ? 'name=' + params.name : '') + (params.role ? '&role=' + params.role : '') + (params.currentPlan ? '&currentPlan=' + params.currentPlan : '') + (params.status ? '&status=' + params.status : '')
  const filterParams = ''

  const response = await axios.get(adminConfig.categoriesGetAllEndpoint , { headers })
  // console.log(response)
  return {
    categories: response.data,
  };
})

// ** Add Categories
export const addCategory = createAsyncThunk('appAdminCategory/addData', async (data, { getState, dispatch }) => {
  const headers = {
    Accept: 'application/json',
    // 'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data',
    // "processData": false,
    // "mimeType": "multipart/form-data",
    // "contentType": false,
    // "data": form,
    Authorization: 'Bearer ' + window.localStorage.getItem(adminConfig.storageTokenKeyName)
  }
  console.log(data)
  let returnResponse = null
  try {
    const response = await axios.post(adminConfig.categoryAddEndpoint, data, { headers })
    dispatch(fetchCategoriesList(getState().user.params))
    returnResponse = { 'status': 'success', 'message': response?.data?.message }
  } catch (e) {
    returnResponse = {
      'status': 'failed',
      'message': (typeof (e?.response?.data?.message) != undefined ? (e?.response?.data?.message) : ('Something went wrong'))
    }
  }
  return returnResponse
})

// ** Delete Category
export const deleteCategory = createAsyncThunk('appAdminCategory/deleteData', async (id, { getState, dispatch }) => {
  const response = await axios.delete('/apps/users/delete' + id)
  dispatch(fetchCategoriesList(getState().user.params))

  return response.data
}
)

export const appCategoriesSlice = createSlice({
  name: 'appAdminCategory',
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCategoriesList.fulfilled, (state, action) => {
      state.data = action.payload.categories
    })
  }
})

export default appCategoriesSlice.reducer
