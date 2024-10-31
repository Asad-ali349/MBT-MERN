import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GET, PATCHFILE, POST, UPDATE } from '../../api/AXIOS';
import { toast } from "react-toastify";

const LOGIN = 'login';
const PROFILE = 'profile';
const UPDATEPROFILE = 'updateprofile';
const FORGOTPASSWORD = 'forgotpassword';
const RESETPASSWORD = 'resetpassword';
const CHANGEPASSWORD = 'changepassword';


export const login = createAsyncThunk(LOGIN, async (data) => {
  try {
    const response = await POST('auth/admin/signin',data);
    toast.success("Signin Sucessfully...")
    return response.data;
  } catch (error) {
    // console.error('Error fetching disclaimer:', error);
    toast.error(error)
    throw error;
  }
});

export const forgotPassword = createAsyncThunk(FORGOTPASSWORD, async (data) => {
  try {
    const response = await POST('auth/forgot_password',data);
    toast.success("Link sent to your email sucessfully...");
    return response.data;
  } catch (error) {
    // console.error('Error fetching disclaimer:', error);
    toast.error(error)
    throw error;
  }
});

export const resetPassword = createAsyncThunk(RESETPASSWORD, async (data) => {
  try {
    
    if(data.password.password!=data.password.confirm_password){
      toast.error("New Password and Confirm must be same")
      throw new Error("New Password and Confirm must be same");
    }
    const response = await UPDATE(`auth/reset_password/${data.token}`,data.password);
    toast.success("Passsword Updated Sucessfully...");
    return response.data;
  } catch (error) {
    // console.error('Error fetching disclaimer:', error);
    toast.error(error)
    throw error;
  }
});
export const changePassword = createAsyncThunk(CHANGEPASSWORD, async (data) => {
  try {
    if(data.new_password!=data.confirm_password){
      throw "New Password and Confirm must be same";
    }

    const response = await UPDATE(`user/change_password`,data);
    toast.success("Passsword Updated Sucessfully...");
    return response.data;
  } catch (error) {
    // console.error('Error fetching disclaimer:', error);
    toast.error(error)
    throw error;
  }
});

export const fetchProfile = createAsyncThunk(PROFILE, async () => {
  try {
    const response = await GET('user/profile');
    // toast.success("Signin Sucessfully...")
    return response.data;
  } catch (error) {
    // console.error('Error fetching disclaimer:', error);
    toast.error(error)
    throw error;
  }
});

export const updateProfile = createAsyncThunk(UPDATEPROFILE, async (data) => {
  try {
    const response = await PATCHFILE('user/profile',data);
    toast.success("Profile Updated Sucessfully...")
    return response.data;
  } catch (error) {
    // console.error('Error fetching disclaimer:', error);
    toast.error(error)
    throw error;
  }
});


const AuthSlice = createSlice({
  name: 'Auth',
  initialState: {
    loading: false,
    submitting: false,
    user: { token: null, role: '' },
    profile:{}
  },
  extraReducers: (builder) => {
    // ---------------login------------------
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem('token',action.payload.token);
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      })
      // ---------------fetchProfile------------------
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.loading = false;
      })
      // ---------------updateProfile------------------
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.rejected, (state) => {
        state.loading = false;
      })
      // ---------------forgotPassword------------------
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.loading = false;
      })
      // ---------------reset_password------------------
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.loading = false;
      })
      // ---------------change_password------------------
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePassword.rejected, (state) => {
        state.loading = false;
      })
  },
});

export const AuthSliceActions = AuthSlice.actions;

export default AuthSlice.reducer;
