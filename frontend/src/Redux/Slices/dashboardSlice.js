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
export const fetchProductStatData = createAsyncThunk('fetchProductStatData', async ({date}) => {
  try {
    let query='';
    if(date){
        query+=`?date=${date}`          
    }else{
        let todayDate = new Date();
        const hours = todayDate.getHours();
        
        // If the time is before 6 AM, take the previous day's date
        if (hours < 6) {
            todayDate.setDate(todayDate.getDate() - 1);
        }
        
        // Format the date as YYYY-MM-DD for the query string
        const formattedDate = todayDate.toISOString().split('T')[0];
        console.log(formattedDate)
        query += `?date=${formattedDate}`;
    }
    console.log(query)
    const response = await GET(`order/product-stats${query}`);
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
    yearlySales:[],
    productStats:[]
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDashboardData.fulfilled, (state, action) => {
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
      .addCase(fetchProductStatData.fulfilled, (state, action) => {
        state.loading = false;
        state.productStats= action.payload
        
      })
      .addCase(fetchProductStatData.pending,(state) => {
        state.loading = true;
      })
      .addCase(fetchProductStatData.rejected, (state) => {
        state.loading = false;
      })
      
  },
});

export const dashboardActions = dashboardSlice.actions;

export default dashboardSlice.reducer;
