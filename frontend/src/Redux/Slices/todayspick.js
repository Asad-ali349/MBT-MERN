import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GET, POST } from '../../api/AXIOS';
import { toast } from "react-toastify";

const FETCH_All_Stock = 'fetchAllStocks';
const FETCH_TODAY_Stock = 'fetchTodaysStock';
const FETCH_Stock_DETAIL = 'fetchStockDetail';
const ADD_TODAYS_STOCK = 'addTodaysStocks';

export const fetchAllStocks = createAsyncThunk(FETCH_All_Stock, async () => {
  try {
    const response = await GET('https://api.twelvedata.com/stocks?country=Canada&source=docs');
    return response.data.data;
  } catch (error) {
    toast.error(error)
    throw error;
  }
});

export const addTodaysStocks = createAsyncThunk(ADD_TODAYS_STOCK, async (data) => {
  try {
    const response = await POST('todays_pick',data);
    toast.success("Stock Saved Sucessfully....");
    return response.data.symbols_detail;
  } catch (error) {
    toast.error(error)
    console.log(error)
    throw error;
  }
});

export const fetchTodaysStocks = createAsyncThunk(FETCH_TODAY_Stock, async () => {
  try {
    const response = await GET('todays_pick');
    return response.data.symbols_detail;
  } catch (error) {
    toast.error(error)
    throw error;
  }
});

export const fetchStocksDetail = createAsyncThunk(FETCH_Stock_DETAIL, async (symbol) => {
  try {
    const response = await GET(`https://api.twelvedata.com/time_series?apikey=ee7efe74b0f34bca8a0be754045cefbf&interval=1day&symbol=${symbol}&format=JSON`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    toast.error(error)
    throw error;
  }
});

const tradeSlice = createSlice({
  name: 'Trade',
  initialState: {
    loading: false,
    submitting: false,
    allStocks: [],
    todaysStock:[],
    stockDetail:{}
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStocks.fulfilled, (state, action) => {
        state.loading = false;
        state.allStocks = action.payload;
      })
      .addCase(fetchAllStocks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllStocks.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addTodaysStocks.fulfilled, (state, action) => {
        state.loading = false;
        state.todaysStock = action.payload;
      })
      .addCase(addTodaysStocks.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTodaysStocks.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchTodaysStocks.fulfilled, (state, action) => {
        state.loading = false;
        state.todaysStock = action.payload;
      })
      .addCase(fetchTodaysStocks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodaysStocks.rejected, (state) => {
        state.loading = false;
      })
      
      .addCase(fetchStocksDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.stockDetail=action.payload;
      })
      .addCase(fetchStocksDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStocksDetail.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const tradeActions = tradeSlice.actions;

export default tradeSlice.reducer;
