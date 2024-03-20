import { configureStore } from '@reduxjs/toolkit';

import authSlice from './Slices/authSlice';
import categorySlice from './Slices/categorySlice';
import productSlice from './Slices/productSlice';


const store= configureStore({
    reducer:{
        auth:authSlice,
        categories:categorySlice,
        products:productSlice
    }
})




export default store;