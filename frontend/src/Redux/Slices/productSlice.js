import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DELETE, GET, PATCHFILE, POST, POSTFILE, UPDATE } from '../../api/AXIOS';
import { toast } from "react-toastify";

const FETCH_All_PRRODUCT = 'fetchAllProducts';
const UPDATE_PRRODUCT = 'updateProduct';
const DELETE_PRRODUCT = 'deleteProduct';
const ADD_PRRODUCT = 'addProduct';

export const fetchAllProducts = createAsyncThunk(FETCH_All_PRRODUCT, async () => {
  try {
    const response = await GET('product');
    return response.data;
  } catch (error) {
    toast.error(error)
    throw error;
  }
});

export const addProduct = createAsyncThunk(ADD_PRRODUCT, async (data) => {
  try {
    const response = await POSTFILE('product',data);
    toast.success("Product Saved Sucessfully....");
    
  } catch (error) {
    toast.error(error)
    console.log(error)
    throw error;
  }
});

export const UpdateProduct = createAsyncThunk(UPDATE_PRRODUCT, async (data) => {
  try {
    console.log(data)
    const response = await PATCHFILE('product/'+data._id,data);
    toast.success("Product updated Sucessfully....");
  } catch (error) {
    toast.error(error)
    throw error;
  }
});

export const deleteProduct = createAsyncThunk(DELETE_PRRODUCT, async (id) => {
  try {
    const response = await DELETE('product/'+id);
    toast.success("Product deleted Sucessfully....");
    return id;
  } catch (error) {
    toast.error(error)
    throw error;
  }
});

const productSlice = createSlice({
  name: 'Product',
  initialState: {
    loading: false,
    submitting: false,
    products: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.rejected, (state) => {
        state.loading = false;
      })
      .addCase(UpdateProduct.fulfilled, (state, action) => {
        state.loading = false;
        
      })
      .addCase(UpdateProduct.pending, (state) => {
        state.loading = true;
      }).addCase(UpdateProduct.rejected, (state) => {
        state.loading = false;
      }).addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        const deleted_id=action.payload;
        state.products=state.products.filter((item)=>{ 
            return item._id!=deleted_id
        });
      }).addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      }).addCase(deleteProduct.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
