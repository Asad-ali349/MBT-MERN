import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GET } from '../../api/AXIOS';
import { toast } from "react-toastify";


export const fetchDashboardData = createAsyncThunk('fetchDashboardData', async () => {
  try {
    const response = await GET('auth/admin/dashboard');
    return response.data;
  } catch (error) {
    toast.error(error)
    throw error;
  }
});

const dashboardSlice = createSlice({
  name: 'Dashboard',
  initialState: {
    loading: false,
    submitting: false,
    totalSalesToday: 0,
    totalDiscountToday: 0,
    totalDiscountOrderTodayResult: 0,
    totalPendingOrderToday: 0,
    totalSalesThisMonth: 0,
    onsiteOrdersToday: 0,
    onlineOrdersToday: 0,
    totalProducts: 0,
    totalCategories: 0,
    monthlySales:[],
    yearlySales:[]
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.totalDiscountToday= action.payload.totalDiscountToday
        state.totalSalesToday= action.payload.totalSalesToday
        state.totalDiscountOrderTodayResult= action.payload.totalDiscountOrderTodayResult
        state.totalPendingOrderToday= action.payload.totalPendingOrderToday
        state.totalSalesThisMonth= action.payload.totalSalesThisMonth
        state.onsiteOrdersToday= action.payload.onsiteOrdersToday
        state.onlineOrdersToday= action.payload.onlineOrdersToday
        state.totalProducts= action.payload.totalProducts
        state.totalCategories= action.payload.totalCategories
        state.monthlySales= action.payload.monthlySales
        state.yearlySales= action.payload.yearlySales
      })
      .addCase(fetchDashboardData.pending,(state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardData.rejected, (state) => {
        state.loading = false;
      })
      
  },
});

export const tradeActions = dashboardSlice.actions;

export default dashboardSlice.reducer;
