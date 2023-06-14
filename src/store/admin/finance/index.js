import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import adminConfig from 'src/config/adminConfig'

// ** Fetch Categories
export const fetchAdminFinanceList = createAsyncThunk('appAdminFinance/fetchData', async params => {
  const data = [];
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + window.localStorage.getItem(adminConfig.storageTokenKeyName)
  }

  // axios.get(adminConfig.AdminListEndpoint, params, { headers: headers })

  // const filterParams = "?" + (params.name ? 'name=' + params.name : '') + (params.role ? '&role=' + params.role : '') + (params.currentPlan ? '&currentPlan=' + params.currentPlan : '') + (params.status ? '&status=' + params.status : '')
  const filterParams = ''

  const response = await axios.get(adminConfig.adminFinanceGetAllEndpoint, { headers })
  return {
    adminFinances: response.data,
  };
})



export const appAdminFinancesSlice = createSlice({
  name: 'appAdminFinance',
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAdminFinanceList.fulfilled, (state, action) => {
      state.data = action.payload.adminFinances
    })
  }
})

export default appAdminFinancesSlice.reducer
