import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  DELETE,
  GET,
  POST,
  UPDATE,
} from "../../api/AXIOS";
import { toast } from "react-toastify";

const FETCH_All_PURCHASE = "fetchAllPurchases";
const FETCH_PURCHASE_DETAIL = "fetchPurchaseDetail";
const UPDATE_PURCHASE = "updatePurchase";
const DELETE_PURCHASE = "deletePurchase";
const ADD_PURCHASE = "addPurchase";

export const fetchAllPurchases = createAsyncThunk(
  FETCH_All_PURCHASE,
  async (date) => {
    try {
      const response = await GET(`purchase${date ? `?date=${date}` : ''}`);
      return response.data;
    } catch (error) {
      toast.error(error);
      throw error;
    }
  }
);

export const fetchPurchaseDetail = createAsyncThunk(
  FETCH_PURCHASE_DETAIL,
  async (id) => {
    try {
      const response = await GET(`purchase/${id}`);
      return response.data;
    } catch (error) {
      toast.error(error);
      throw error;
    }
  }
);

export const addPurchase = createAsyncThunk(ADD_PURCHASE, async (data) => {
  try {
    await POST("purchase", data);
    toast.success("Purchase Saved Sucessfully....");
  } catch (error) {
    toast.error(error);
    console.log(error);
    throw error;
  }
});

export const UpdatePurchase = createAsyncThunk(
  UPDATE_PURCHASE,
  async (data) => {
    try {
      await UPDATE("purchase/" + data?._id, data);
      toast.success("Purchase updated Sucessfully....");
    } catch (error) {
      toast.error(error);
      throw error;
    }
  }
);

export const deletePurchase = createAsyncThunk(DELETE_PURCHASE, async (id) => {
  try {
    await DELETE("purchase/" + id);
    toast.success("Purchase deleted Sucessfully....");
    return id;
  } catch (error) {
    toast.error(error);
    throw error;
  }
});

const purchaseSlice = createSlice({
  name: "Purchase",
  initialState: {
    loading: false,
    submitting: false,
    purchases: [],
    purchase:null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPurchases.fulfilled, (state, action) => {
        state.loading = false;
        state.purchases = action.payload;
      })
      .addCase(fetchAllPurchases.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllPurchases.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchPurchaseDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.purchase = action.payload;
      })
      .addCase(fetchPurchaseDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPurchaseDetail.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addPurchase.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addPurchase.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPurchase.rejected, (state) => {
        state.loading = false;
      })
      .addCase(UpdatePurchase.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(UpdatePurchase.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdatePurchase.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deletePurchase.fulfilled, (state, action) => {
        state.loading = false;
        const deleted_id = action.payload;
        state.purchases = state.purchases.filter((item) => {
          return item._id != deleted_id;
        });
      })
      .addCase(deletePurchase.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePurchase.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const purchaseActions = purchaseSlice.actions;

export default purchaseSlice.reducer;
