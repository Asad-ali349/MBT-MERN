import { configureStore } from '@reduxjs/toolkit';

import authSlice from './Slices/authSlice';
import categorySlice from './Slices/categorySlice';
import productSlice from './Slices/productSlice';
import OnsiteOrderSlice from './Slices/OnsiteOrderSlice';


const store= configureStore({
    reducer:{
        auth:authSlice,
        categories:categorySlice,
        products:productSlice,
        OnsiteOrders:OnsiteOrderSlice
    }
})




export default store;