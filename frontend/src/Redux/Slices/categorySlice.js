import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DELETE, GET, PATCHFILE, POST, POSTFILE, UPDATE } from '../../api/AXIOS';
import { toast } from "react-toastify";

const FETCH_All_CATEGORY = 'fetchAllCategories';
const UPDATE_CATEGORY = 'updateCategory';
const DELETE_CATEGORY = 'deleteCategory';
const ADD_CATEGORY = 'addCategory';

export const fetchAllCategories = createAsyncThunk(FETCH_All_CATEGORY, async () => {
  try {
    const response = await GET('category');
    return response.data;
  } catch (error) {
    toast.error(error)
    throw error;
  }
});

export const addCategory = createAsyncThunk(ADD_CATEGORY, async (data) => {
  try {
    const response = await POSTFILE('category',data);
    toast.success("Category Saved Sucessfully....");
    return response.data.category
  } catch (error) {
    toast.error(error)
    console.log(error)
    throw error;
  }
});

export const UpdateCategory = createAsyncThunk(UPDATE_CATEGORY, async (data) => {
  try {
    const response = await PATCHFILE('category/'+data._id,data);
    toast.success("Category updated Sucessfully....");
    return response.data.category;
  } catch (error) {
    toast.error(error)
    throw error;
  }
});

export const deleteCategory = createAsyncThunk(DELETE_CATEGORY, async (id) => {
  try {
    const response = await DELETE('category/'+id);
    toast.success("Category deleted Sucessfully....");
    return id;
  } catch (error) {
    toast.error(error)
    throw error;
  }
});

const tradeSlice = createSlice({
  name: 'Category',
  initialState: {
    loading: false,
    submitting: false,
    categories: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCategories.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCategory.rejected, (state) => {
        state.loading = false;
      })
      .addCase(UpdateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const updated_category = action.payload;
        const index = state.categories.findIndex(obj => obj._id === updated_category._id);
        if (index !== -1) {
            state.categories[index] = updated_category;
        }
      })
      .addCase(UpdateCategory.pending, (state) => {
        state.loading = true;
      }).addCase(UpdateCategory.rejected, (state) => {
        state.loading = false;
      }).addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        const deleted_id=action.payload;
        state.categories=state.categories.filter((item)=>{ 
            return item._id!=deleted_id
        });
      }).addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      }).addCase(deleteCategory.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const tradeActions = tradeSlice.actions;

export default tradeSlice.reducer;
